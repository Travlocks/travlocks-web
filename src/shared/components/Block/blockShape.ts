export type ConnectorType = 'plug' | 'socket';
export type ConnectorDirection = 'top' | 'right' | 'bottom' | 'left';
export type ConnectorAlignment = 'start' | 'center' | 'end';

export interface Connector {
  direction: ConnectorDirection;
  type: ConnectorType;
  align?: ConnectorAlignment;
}

export type BlockConnections = Connector[];

export const createConnectorPath = (
  x: number,
  y: number,
  tabWidth: number,
  tabHeight: number,
  type: ConnectorType,
  direction: ConnectorDirection,
  inset: number = 6,
): string => {
  const isPlug = type === 'plug';

  // Coordinate System for Connector:
  //
  //       nx,ny
  //         ^
  //         |
  //   Start *------> dx,dy
  //         |
  //       (Inside Block)
  let dx = 0,
    dy = 0;
  let nx = 0,
    ny = 0;

  if (direction === 'top') {
    dx = 1;
    ny = -1;
  } else if (direction === 'right') {
    dy = 1;
    nx = 1;
  } else if (direction === 'bottom') {
    dx = -1;
    ny = 1;
  } else if (direction === 'left') {
    dy = -1;
    nx = -1;
  }

  const scale = isPlug ? 1 : -1;
  const vx = nx * scale;
  const vy = ny * scale;

  const r = inset;
  const br = inset;

  /*
   *      P2/C2--------C3/P5    (Top Edge)
   *      /                \
   *     /                  \
   *   P1/C1              P6/C4
   *   |                      |
   *   * (Start)              * (Dest)
   */

  const p1x = x + dx * br + vx * br;
  const p1y = y + dy * br + vy * br;

  const c1x = x + dx * br;
  const c1y = y + dy * br;

  const p2x = x + dx * br + vx * (tabHeight - r);
  const p2y = y + dy * br + vy * (tabHeight - r);

  const c2x = x + dx * br + vx * tabHeight;
  const c2y = y + dy * br + vy * tabHeight;

  const p3x = x + dx * (br + r) + vx * tabHeight;
  const p3y = y + dy * (br + r) + vy * tabHeight;

  const p4x = x + dx * (tabWidth - br - r) + vx * tabHeight;
  const p4y = y + dy * (tabWidth - br - r) + vy * tabHeight;

  const c3x = x + dx * (tabWidth - br) + vx * tabHeight;
  const c3y = y + dy * (tabWidth - br) + vy * tabHeight;

  const p5x = x + dx * (tabWidth - br) + vx * (tabHeight - r);
  const p5y = y + dy * (tabWidth - br) + vy * (tabHeight - r);

  const p6x = x + dx * (tabWidth - br) + vx * br;
  const p6y = y + dy * (tabWidth - br) + vy * br;

  const c4x = x + dx * (tabWidth - br);
  const c4y = y + dy * (tabWidth - br);

  const destX = x + dx * tabWidth;
  const destY = y + dy * tabWidth;

  return ` Q ${c1x} ${c1y} ${p1x} ${p1y} L ${p2x} ${p2y} Q ${c2x} ${c2y} ${p3x} ${p3y} L ${p4x} ${p4y} Q ${c3x} ${c3y} ${p5x} ${p5y} L ${p6x} ${p6y} Q ${c4x} ${c4y} ${destX} ${destY}`;
};

export const createBlockPath = (
  width: number,
  height: number,
  radius: number,
  tabWidth: number,
  tabHeight: number,
  connections: BlockConnections,
  startX: number = tabHeight,
  startY: number = tabHeight,
): string => {
  const endX = startX + width;
  const endY = startY + height;

  const ALIGN_MARGIN = 30;

  const getTabStart = (edgeLength: number, align?: ConnectorAlignment) => {
    switch (align) {
      case 'start':
        return ALIGN_MARGIN;
      case 'end':
        return edgeLength - tabWidth - ALIGN_MARGIN;
      case 'center':
      default:
        return (edgeLength - tabWidth) / 2;
    }
  };

  const connMap: Partial<Record<ConnectorDirection, Connector>> = {};
  connections.forEach((c) => {
    connMap[c.direction] = c;
  });

  // Helper for straight lines and corners
  //
  //   (startX, startY)
  //      *-----------------------* (endX, startY)
  //      |  Top Edge (L->R)      |
  //      |                       |
  // Left |                       | Right
  // Edge |                       | Edge
  // (B->T)|                       | (T->B)
  //      |                       |
  //      *-----------------------* (endX, endY)
  //   (startX, endY)  Bottom Edge (R->L)
  //
  let path = `M ${startX} ${startY + radius}`;

  path += ` Q ${startX} ${startY} ${startX + radius} ${startY}`;
  const topConn = connMap.top;
  if (!topConn) {
    path += ` L ${endX - radius} ${startY}`;
  } else {
    const offset = getTabStart(width, topConn.align);
    const tabStart = startX + offset;

    path += ` L ${tabStart} ${startY}`;
    path += createConnectorPath(tabStart, startY, tabWidth, tabHeight, topConn.type, 'top');
    path += ` L ${endX - radius} ${startY}`;
  }

  path += ` Q ${endX} ${startY} ${endX} ${startY + radius}`;
  const rightConn = connMap.right;
  if (!rightConn) {
    path += ` L ${endX} ${endY - radius}`;
  } else {
    const offset = getTabStart(height, rightConn.align);
    const tabStart = startY + offset;

    path += ` L ${endX} ${tabStart}`;
    path += createConnectorPath(endX, tabStart, tabWidth, tabHeight, rightConn.type, 'right');
    path += ` L ${endX} ${endY - radius}`;
  }

  path += ` Q ${endX} ${endY} ${endX - radius} ${endY}`;
  const bottomConn = connMap.bottom;
  if (!bottomConn) {
    path += ` L ${startX + radius} ${endY}`;
  } else {
    const offset = getTabStart(width, bottomConn.align);
    const tabVisualStart = startX + offset;
    const tabVisualEnd = tabVisualStart + tabWidth;

    path += ` L ${tabVisualEnd} ${endY}`;
    path += createConnectorPath(tabVisualEnd, endY, tabWidth, tabHeight, bottomConn.type, 'bottom');
    path += ` L ${startX + radius} ${endY}`;
  }

  path += ` Q ${startX} ${endY} ${startX} ${endY - radius}`;
  const leftConn = connMap.left;
  if (!leftConn) {
    path += ` L ${startX} ${startY + radius}`;
  } else {
    const offset = getTabStart(height, leftConn.align);
    const tabVisualStart = startY + offset;
    const tabVisualEnd = tabVisualStart + tabWidth;

    path += ` L ${startX} ${tabVisualEnd}`;
    path += createConnectorPath(startX, tabVisualEnd, tabWidth, tabHeight, leftConn.type, 'left');
    path += ` L ${startX} ${startY + radius}`;
  }

  path += ' Z';
  return path;
};
