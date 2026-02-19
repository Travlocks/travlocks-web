import { getAllSnapPositionsToTail } from './snapToTail';
import type { ResponseOptimizeDto } from '../blockBuild.type';
import type { Block } from '../types/block';

const LAYOUT_START_X = 44;
const LAYOUT_START_Y = 76;

/**
 * optimize 응답의 orderNo 기준으로 기존 블록 순서를 재배치
 * getAllSnapPositionsToTail로 퍼즐처럼 맞닿는 위치 후보를 구한 뒤 랜덤 선택
 */
export function reorderBlocksByOptimize(
  currentBlocks: Block[],
  optimizeVlocks: ResponseOptimizeDto['data']['vlocks'],
): Block[] {
  const startBlock = currentBlocks.find((b) => b.blockId === 0);
  if (!startBlock) return currentBlocks;

  const orderMap = new Map(optimizeVlocks.map((v) => [v.templateVlockId, v.orderNo]));

  // 시작 블록 제외 블록 정렬
  const nonStartBlocks = currentBlocks
    .filter((b) => b.blockId !== 0)
    .sort((a, b) => {
      const orderA = orderMap.get(a.templateVlocksId ?? -1) ?? Infinity;
      const orderB = orderMap.get(b.templateVlocksId ?? -1) ?? Infinity;
      return orderA - orderB;
    });

  // 시작 블록 업데이트
  const updatedStart: Block = {
    ...startBlock,
    x: LAYOUT_START_X,
    y: LAYOUT_START_Y,
    connectedTo: nonStartBlocks.length > 0 ? nonStartBlocks[0].blockId : null,
  };

  // 시작 블록 추가
  const placed: Block[] = [updatedStart];

  // 블록 배치
  for (let i = 0; i < nonStartBlocks.length; i++) {
    const prevBlock = placed[placed.length - 1];
    const block = nonStartBlocks[i];

    // 맞닿는 위치 후보를 구한 뒤 랜덤 선택
    const options = getAllSnapPositionsToTail({
      tail: prevBlock,
      drag: { points: block.points, connectors: block.connectors },
    });
    // 맞닿는 위치 후보 중 랜덤 선택
    const snapPos = options.length > 0 ? options[Math.floor(Math.random() * options.length)] : null;

    placed.push({
      ...block,
      x: snapPos?.x ?? prevBlock.x + prevBlock.w + 20,
      y: snapPos?.y ?? prevBlock.y,
      connectedFrom: prevBlock.blockId,
      connectedTo: i < nonStartBlocks.length - 1 ? (nonStartBlocks[i + 1]?.blockId ?? null) : null,
    });
  }

  return placed;
}
