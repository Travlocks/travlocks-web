import { getConnectorCenter, type Connector, type Point } from '@/shared/components/Block/blockShape';
import type { Block } from '../types/block';

const TAB_WIDTH = 42;

export type ConnectedConnectorEdges = {
  connectedPlugEdgeIndex: number | null;
  connectedSocketEdgeIndex: number | null;
};

const distance = (a: Point, b: Point): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
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
  const sockets = parent.connectors.filter((connector) => connector.type === 'socket');
  const plugs = child.connectors.filter((connector) => connector.type === 'plug');

  let best:
    | {
        socket: Connector;
        plug: Connector;
        dist: number;
      }
    | undefined;

  for (const socket of sockets) {
    const socketAbs = toAbsoluteCenter(parent, socket);
    if (!socketAbs) continue;

    for (const plug of plugs) {
      const plugAbs = toAbsoluteCenter(child, plug);
      if (!plugAbs) continue;

      const d = distance(socketAbs, plugAbs);
      if (!best || d < best.dist) {
        best = { socket, plug, dist: d };
      }
    }
  }

  if (!best) return undefined;
  return { socket: best.socket, plug: best.plug };
};

/**
 * 블록이 다른 블록과 어떤 connector와 연결되어 있는지를 반환
 * @param blocks
 * @returns 각 블록이 실제로 연결돼있는 connector의 edgeIndex
 */
export const deriveConnectedConnectorEdgeMap = (blocks: Block[]): Map<number, ConnectedConnectorEdges> => {
  const byId = new Map(blocks.map((block) => [block.blockId, block]));
  const edgeMap = new Map<number, ConnectedConnectorEdges>();

  for (const block of blocks) {
    edgeMap.set(block.blockId, {
      connectedPlugEdgeIndex: null,
      connectedSocketEdgeIndex: null,
    });
  }

  for (const parent of blocks) {
    if (parent.connectedTo == null) continue;

    const child = byId.get(parent.connectedTo);
    if (!child) continue;

    const pair = pickBestConnectorPair(parent, child);
    if (!pair) continue;

    const parentState = edgeMap.get(parent.blockId) ?? {
      connectedPlugEdgeIndex: null,
      connectedSocketEdgeIndex: null,
    };
    parentState.connectedSocketEdgeIndex = pair.socket.edgeIndex;
    edgeMap.set(parent.blockId, parentState);

    const childState = edgeMap.get(child.blockId) ?? {
      connectedPlugEdgeIndex: null,
      connectedSocketEdgeIndex: null,
    };
    childState.connectedPlugEdgeIndex = pair.plug.edgeIndex;
    edgeMap.set(child.blockId, childState);
  }

  return edgeMap;
};
