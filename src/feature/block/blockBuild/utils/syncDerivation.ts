import { getBoundingBox, getConnectorCenter, type Connector, type Point } from '@/shared/components/Block/blockShape';
import type { ConnectionPortType, RequestCreateBlockDto, RequestReorderBlocksDto } from '../blockBuild.type';
import type { Block } from '../types/block';

const START_BLOCK_ID = 0;
const TAB_WIDTH = 42;

type DerivedPorts = {
  inputPort: ConnectionPortType | null;
  outputPort: ConnectionPortType | null;
};

const distance = (a: Point, b: Point): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const toPortType = (block: Block, localCenter: Point): ConnectionPortType => {
  const { w, h } = getBoundingBox(block.points);
  const isLeft = localCenter.x <= w / 2;
  const isTop = localCenter.y <= h / 2;

  if (isLeft && isTop) return 'TOP_LEFT';
  if (!isLeft && isTop) return 'TOP_RIGHT';
  if (isLeft && !isTop) return 'BOTTOM_LEFT';
  return 'BOTTOM_RIGHT';
};

const toAbsoluteCenter = (block: Block, connector: Connector): Point | null => {
  const local = getConnectorCenter(block.points, connector, TAB_WIDTH);
  if (!local) return null;

  return {
    x: block.x + local.x,
    y: block.y + local.y,
  };
};

const pickBestConnectorPair = (parent: Block, child: Block) => {
  const sockets = parent.connectors.filter((c) => c.type === 'socket');
  const plugs = child.connectors.filter((c) => c.type === 'plug');

  let best:
    | {
        socket: Connector;
        socketLocal: Point;
        plug: Connector;
        plugLocal: Point;
        dist: number;
      }
    | undefined;

  for (const socket of sockets) {
    const socketLocal = getConnectorCenter(parent.points, socket, TAB_WIDTH);
    const socketAbs = toAbsoluteCenter(parent, socket);
    if (!socketAbs || !socketLocal) continue;

    for (const plug of plugs) {
      const plugLocal = getConnectorCenter(child.points, plug, TAB_WIDTH);
      const plugAbs = toAbsoluteCenter(child, plug);
      if (!plugAbs || !plugLocal) continue;

      const d = distance(socketAbs, plugAbs);
      if (!best || d < best.dist) {
        best = { socket, socketLocal, plug, plugLocal, dist: d };
      }
    }
  }

  return best;
};

export const deriveOrderNoMap = (blocks: Block[], startId: number = START_BLOCK_ID): Map<number, number> => {
  const orderMap = new Map<number, number>();
  const byId = new Map(blocks.map((b) => [b.blockId, b]));

  for (const block of blocks) {
    if (block.blockId !== startId) {
      orderMap.set(block.blockId, -1);
    }
  }

  const visited = new Set<number>();
  let current = byId.get(startId);
  let order = 1;

  while (current?.connectedTo != null) {
    const next = byId.get(current.connectedTo);
    if (!next || visited.has(next.blockId)) break;

    visited.add(next.blockId);
    if (next.blockId !== startId) {
      orderMap.set(next.blockId, order++);
    }
    current = next;
  }

  return orderMap;
};

export const derivePortMap = (blocks: Block[], startId: number = START_BLOCK_ID): Map<number, DerivedPorts> => {
  const portMap = new Map<number, DerivedPorts>();
  const byId = new Map(blocks.map((b) => [b.blockId, b]));

  for (const block of blocks) {
    if (block.blockId !== startId) {
      portMap.set(block.blockId, { inputPort: null, outputPort: null });
    }
  }

  for (const parent of blocks) {
    if (parent.blockId === startId || parent.connectedTo == null) continue;

    const child = byId.get(parent.connectedTo);
    if (!child || child.blockId === startId) continue;

    const pair = pickBestConnectorPair(parent, child);
    if (!pair) continue;

    const parentState = portMap.get(parent.blockId);
    if (parentState) {
      parentState.outputPort = toPortType(parent, pair.socketLocal);
      portMap.set(parent.blockId, parentState);
    }

    const childState = portMap.get(child.blockId);
    if (childState) {
      childState.inputPort = toPortType(child, pair.plugLocal);
      portMap.set(child.blockId, childState);
    }
  }

  return portMap;
};

export const toCreateRequest = (block: Block, ports: DerivedPorts | undefined): RequestCreateBlockDto => {
  return {
    vlockId: block.blockId,
    canvasX: block.x,
    canvasY: block.y,
    inputPort: ports?.inputPort ?? null,
    outputPort: ports?.outputPort ?? null,
  };
};

export const buildDerivedReorderRequest = (
  blocks: Block[],
  startId: number = START_BLOCK_ID,
): RequestReorderBlocksDto => {
  const orderMap = deriveOrderNoMap(blocks, startId);
  const portMap = derivePortMap(blocks, startId);

  const vlockOrders = blocks
    .filter((b) => b.blockId !== startId && b.templateVlocksId != null)
    .map((block) => ({
      templateVlocksId: block.templateVlocksId as number,
      orderNo: orderMap.get(block.blockId) ?? -1,
      canvasX: block.x,
      canvasY: block.y,
      inputPort: portMap.get(block.blockId)?.inputPort ?? null,
      outputPort: portMap.get(block.blockId)?.outputPort ?? null,
    }))
    .sort((a, b) => a.orderNo - b.orderNo || a.templateVlocksId - b.templateVlocksId);

  return { vlockOrders };
};
