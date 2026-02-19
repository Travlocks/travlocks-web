import { categoryColor } from '../components/side/block-styles';
import type { CanvasData, CanvasVlockData } from '../blockBuild.type';
import type { Block, CategoryType } from '../types/block';
import { createStartBlockShape, getBlockShapeByDuration } from './blockShapeByDuration';
import { getAllSnapPositionsToTail } from './snapToTail';

const START_BLOCK_ID = 0;
const START_POS = { x: 44, y: 76 };
const CONNECTED_ORDER_GAP = 20;
const FALLBACK_GRID_COLUMNS = 6;
const FALLBACK_GRID_ROWS = 4;
const FALLBACK_GRID_CELL = { x: 150, y: 120 };
const FALLBACK_GRID_OFFSET_FROM_START = { x: 160, y: 120 };
const DAY_SEED_MULTIPLIER = 1000;

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

const seededPosition = (seed: number) => {
  const normalizedSeed = Math.abs(Math.trunc(seed));
  const slotCount = FALLBACK_GRID_COLUMNS * FALLBACK_GRID_ROWS;
  const slot = normalizedSeed % slotCount;
  const col = slot % FALLBACK_GRID_COLUMNS;
  const row = Math.floor(slot / FALLBACK_GRID_COLUMNS);

  return {
    x: START_POS.x + FALLBACK_GRID_OFFSET_FROM_START.x + col * FALLBACK_GRID_CELL.x,
    y: START_POS.y + FALLBACK_GRID_OFFSET_FROM_START.y + row * FALLBACK_GRID_CELL.y,
  };
};

const sortConnectedByOrder = (a: CanvasVlockData, b: CanvasVlockData): number => {
  return a.orderNo - b.orderNo || a.templateVlockId - b.templateVlockId;
};

const splitVlocks = (vlocks: CanvasVlockData[]): { connected: CanvasVlockData[]; detached: CanvasVlockData[] } => {
  const connected = vlocks.filter((v) => v.orderNo > 0).sort(sortConnectedByOrder);
  const detached = vlocks.filter((v) => v.orderNo <= 0);
  return { connected, detached };
};

const hasServerPosition = (
  vlock: CanvasVlockData,
): vlock is CanvasVlockData & {
  canvasX: number;
  canvasY: number;
} => {
  return (
    typeof vlock.canvasX === 'number' &&
    Number.isFinite(vlock.canvasX) &&
    typeof vlock.canvasY === 'number' &&
    Number.isFinite(vlock.canvasY)
  );
};

const resolveInitialPosition = (vlock: CanvasVlockData, dayNo: number): { x: number; y: number } => {
  if (hasServerPosition(vlock)) {
    return { x: vlock.canvasX, y: vlock.canvasY };
  }
  // 좌표가 null 일 때 매번 옮겨다니지 않도록 시드를 고정
  return seededPosition(vlock.templateVlockId + dayNo * DAY_SEED_MULTIPLIER);
};

const buildConnectedOrderPosition = (tail: Block, block: Block): { x: number; y: number } => {
  const options = getAllSnapPositionsToTail({
    tail,
    drag: { points: block.points, connectors: block.connectors },
  });
  if (options.length > 0) {
    return options[0];
  }
  return { x: tail.x + tail.w + CONNECTED_ORDER_GAP, y: tail.y };
};

const createMappedBlock = (vlock: CanvasVlockData, dayNo: number): Block => {
  const category = toKnownCategory(vlock.vlock.category);
  const duration = toDurationLabel(category, vlock.stayHours);
  const shape = getBlockShapeByDuration(duration, category);
  const initial = resolveInitialPosition(vlock, dayNo);

  return {
    blockId: vlock.vlock.vlockId,
    templateVlocksId: vlock.templateVlockId,
    name: vlock.vlock.name,
    category,
    duration,
    imageUrl: vlock.vlock.coverImgUrl,
    color: categoryColor[category],
    x: initial.x,
    y: initial.y,
    w: shape.w,
    h: shape.h,
    points: shape.points,
    connectors: shape.connectors,
    connectedTo: null,
    connectedFrom: null,
  };
};

const indexBlocksByTemplateVlockId = (blocks: Block[]): Map<number, Block> => {
  const entries: Array<[number, Block]> = [];
  for (const block of blocks) {
    if (typeof block.templateVlocksId === 'number') {
      entries.push([block.templateVlocksId, block]);
    }
  }
  return new Map(entries);
};

const rebuildConnectedPositionsByOrder = (
  connected: CanvasVlockData[],
  blocksByTemplateVlockId: Map<number, Block>,
  start: Block,
) => {
  let tail: Block = start;
  for (const item of connected) {
    const block = blocksByTemplateVlockId.get(item.templateVlockId);
    if (!block) continue;

    const { x: newX, y: newY } = buildConnectedOrderPosition(tail, block);
    block.x = newX;
    block.y = newY;
    tail = block;
  }
};

const linkConnectedChain = (
  connected: CanvasVlockData[],
  blocksByTemplateVlockId: Map<number, Block>,
  start: Block,
) => {
  for (let i = 0; i < connected.length; i++) {
    const current = blocksByTemplateVlockId.get(connected[i].templateVlockId);
    if (!current) continue;

    const prev = i > 0 ? blocksByTemplateVlockId.get(connected[i - 1].templateVlockId) : start;
    const next = i < connected.length - 1 ? blocksByTemplateVlockId.get(connected[i + 1].templateVlockId) : null;

    current.connectedFrom = prev?.blockId ?? null;
    current.connectedTo = next?.blockId ?? null;
  }

  start.connectedTo =
    connected.length > 0 ? (blocksByTemplateVlockId.get(connected[0].templateVlockId)?.blockId ?? null) : null;
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
 * 서버에서 가져온 일부 필드가 null일 때 클라이언트에서 처리 로직
 * - 시작 블록에 붙은 블록이 canvasX/Y를 가지고 있으면 그대로 사용
 * - canvasX/Y가 모종의 이유로 null이 되면 orderNo를 사용해 원복 (inputPort, outputPort는 랜덤)
 * - 연결되지 않은 블록이 canvasX/Y가 null이면 랜덤으로 좌표 생성
 */
export const mapCanvasToBlocksFallback = (canvas: CanvasData): Block[] => {
  const start = createStartBlock();
  if (!canvas.vlocks.length) return [start];

  const { connected, detached } = splitVlocks(canvas.vlocks);
  const ordered = [...connected, ...detached];
  const mapped = ordered.map((vlock) => createMappedBlock(vlock, canvas.dayNo));
  const mappedByTemplateVlockId = indexBlocksByTemplateVlockId(mapped);

  const shouldRebuildConnectedByOrder = connected.some((v) => !hasServerPosition(v));
  if (shouldRebuildConnectedByOrder) {
    rebuildConnectedPositionsByOrder(connected, mappedByTemplateVlockId, start);
  }

  linkConnectedChain(connected, mappedByTemplateVlockId, start);

  return [start, ...mapped];
};
