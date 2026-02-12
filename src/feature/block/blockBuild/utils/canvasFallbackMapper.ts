import { categoryColor } from '../components/side/block-styles';
import type { CanvasData } from '../blockBuild.type';
import type { Block, CategoryType } from '../types/block';
import { createStartBlockShape, getBlockShapeByDuration } from './blockShapeByDuration';

const START_BLOCK_ID = 0;
const START_POS = { x: 44, y: 76 };
const BOARD_PADDING = { left: 80, top: 220 };
const BOARD_RANGE = { width: 1400, height: 2000 };

const KNOWN_CATEGORIES: CategoryType[] = ['숙소', '식당', '카페', '쇼핑', '관광지', '문화', '액티비티', '투어', '기타'];

const toKnownCategory = (raw: string): CategoryType => {
  return KNOWN_CATEGORIES.includes(raw as CategoryType) ? (raw as CategoryType) : '기타';
};

const toDurationLabel = (category: CategoryType, stayHours: number): string => {
  const hours = Number.isFinite(stayHours) && stayHours > 0 ? stayHours : 1;

  if (category === '숙소') {
    const nights = Math.max(1, Math.round(hours / 24));
    return `${nights}박`;
  }

  return `${Math.max(1, Math.round(hours))}시간`;
};

const seededUnit = (seed: number): number => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const seededPosition = (seed: number) => {
  const xSeed = seededUnit(seed + 17);
  const ySeed = seededUnit(seed + 71);

  return {
    x: Math.round(BOARD_PADDING.left + xSeed * BOARD_RANGE.width),
    y: Math.round(BOARD_PADDING.top + ySeed * BOARD_RANGE.height),
  };
};

const createStartBlock = (): Block => {
  const { w, h, points, connectors } = createStartBlockShape();
  return {
    blockId: START_BLOCK_ID,
    name: 'START',
    category: '기타',
    duration: '',
    x: START_POS.x,
    y: START_POS.y,
    w,
    h,
    points,
    connectors,
    connectedTo: null,
    connectedFrom: null,
  };
};

/**
 * Temporary fallback mapper.
 * The canvas endpoint currently lacks layout + port fields, so this mapper restores
 * chain structure from orderNo and places blocks in deterministic pseudo-random positions.
 */
export const mapCanvasToBlocksFallback = (canvas: CanvasData): Block[] => {
  const start = createStartBlock();
  if (!canvas.vlocks.length) return [start];

  const connected = canvas.vlocks
    .filter((v) => v.orderNo > 0)
    .sort((a, b) => a.orderNo - b.orderNo || a.templateVlockId - b.templateVlockId);

  const detached = canvas.vlocks.filter((v) => v.orderNo <= 0).sort((a, b) => a.templateVlockId - b.templateVlockId);

  const ordered = [...connected, ...detached];

  const mapped: Block[] = ordered.map((vlock): Block => {
    const category = toKnownCategory(vlock.vlock.category);
    const duration = toDurationLabel(category, vlock.stayHours);
    const shape = getBlockShapeByDuration(duration, category);
    const pos = seededPosition(vlock.templateVlockId + canvas.dayNo * 1000);

    return {
      blockId: vlock.vlock.vlockId,
      templateVlocksId: vlock.templateVlockId,
      name: vlock.vlock.name,
      category,
      duration,
      imageUrl: undefined,
      color: categoryColor[category],
      x: pos.x,
      y: pos.y,
      w: shape.w,
      h: shape.h,
      points: shape.points,
      connectors: shape.connectors,
      connectedTo: null,
      connectedFrom: null,
    };
  });

  for (let i = 0; i < connected.length; i++) {
    const current = mapped.find((b) => b.templateVlocksId === connected[i].templateVlockId);
    if (!current) continue;

    const prev = i > 0 ? mapped.find((b) => b.templateVlocksId === connected[i - 1].templateVlockId) : start;
    const next =
      i < connected.length - 1 ? mapped.find((b) => b.templateVlocksId === connected[i + 1].templateVlockId) : null;

    current.connectedFrom = prev?.blockId ?? null;
    current.connectedTo = next?.blockId ?? null;
  }

  start.connectedTo =
    connected.length > 0
      ? (mapped.find((b) => b.templateVlocksId === connected[0].templateVlockId)?.blockId ?? null)
      : null;

  return [start, ...mapped];
};
