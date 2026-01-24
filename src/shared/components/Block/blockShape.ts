export interface Point {
  x: number;
  y: number;
}

export type ConnectorType = 'plug' | 'socket';
export type ConnectorDirection = 'top' | 'right' | 'bottom' | 'left';
export type ConnectorAlignment = 'start' | 'center' | 'end';

export interface Connector {
  type: ConnectorType;
  edgeIndex: number;
  align?: ConnectorAlignment;
}

// 편의를 위해서 폴리곤을 사각형으로 표현하는 경우 사용함
export interface DirectionalConnector {
  type: ConnectorType;
  direction: ConnectorDirection;
  align?: ConnectorAlignment;
}

export type BlockConnector = Connector | DirectionalConnector;
export type BlockConnections = BlockConnector[];

export const convertToPolygonConnections = (connections: BlockConnections): Connector[] => {
  const polygonConnections: Connector[] = [];
  connections.forEach((c) => {
    if ('edgeIndex' in c) {
      polygonConnections.push(c);
    } else {
      let edgeIndex = -1;
      if (c.direction === 'top') edgeIndex = 0;
      else if (c.direction === 'right') edgeIndex = 1;
      else if (c.direction === 'bottom') edgeIndex = 2;
      else if (c.direction === 'left') edgeIndex = 3;

      if (edgeIndex !== -1) {
        polygonConnections.push({
          type: c.type,
          align: c.align,
          edgeIndex,
        });
      }
    }
  });
  return polygonConnections;
};

export const createConnectorPath = (
  x: number,
  y: number,
  tabWidth: number,
  tabHeight: number,
  type: ConnectorType,
  direction: ConnectorDirection,
  inset: number = 5,
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

export const createRectPoints = (width: number, height: number, startX: number = 0, startY: number = 0): Point[] => {
  return [
    { x: startX, y: startY },
    { x: startX + width, y: startY },
    { x: startX + width, y: startY + height },
    { x: startX, y: startY + height },
  ];
};

export const createPolygonBlockPath = (
  points: Point[],
  radius: number,
  tabWidth: number,
  tabHeight: number,
  connections: Connector[],
): string => {
  if (points.length < 3) return '';

  let path = '';
  const ALIGN_MARGIN = 30;

  // Map connectors to edges by index
  const connMap: Record<number, Connector> = {};
  connections.forEach((c) => {
    connMap[c.edgeIndex] = c;
  });

  const len = points.length;

  for (let i = 0; i < len; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % len];

    // Vector P1->P2
    const vx = p2.x - p1.x;
    const vy = p2.y - p1.y;
    const dist = Math.sqrt(vx * vx + vy * vy);

    // Normalized direction
    const dx = vx / dist;
    const dy = vy / dist;

    let direction: ConnectorDirection = 'top';
    if (Math.abs(dx) > Math.abs(dy)) {
      direction = dx > 0 ? 'top' : 'bottom';
    } else {
      direction = dy > 0 ? 'right' : 'left';
    }

    const startX = p1.x + dx * radius;
    const startY = p1.y + dy * radius;

    const endX = p2.x - dx * radius;
    const endY = p2.y - dy * radius;

    if (i === 0) {
      path += `M ${startX} ${startY}`;
    } else {
      path += ` Q ${p1.x} ${p1.y} ${startX} ${startY}`;
    }

    const conn = connMap[i];
    if (conn) {
      let tabStartDist = 0;

      if (conn.align === 'start') tabStartDist = ALIGN_MARGIN;
      else if (conn.align === 'end') tabStartDist = dist - tabWidth - ALIGN_MARGIN;
      else tabStartDist = (dist - tabWidth) / 2;

      const tx = p1.x + dx * tabStartDist;
      const ty = p1.y + dy * tabStartDist;

      path += ` L ${tx} ${ty}`;

      path += createConnectorPath(tx, ty, tabWidth, tabHeight, conn.type, direction, radius);

      path += ` L ${endX} ${endY}`;
    } else {
      path += ` L ${endX} ${endY}`;
    }
  }

  path += ` Q ${points[0].x} ${points[0].y} ${points[0].x + ((points[1].x - points[0].x) / Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y)) * radius} ${points[0].y + ((points[1].y - points[0].y) / Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y)) * radius}`;

  path += ' Z';

  const p0 = points[0];
  const p1 = points[1];
  const v0x = p1.x - p0.x;
  const v0y = p1.y - p0.y;
  const d0 = Math.sqrt(v0x * v0x + v0y * v0y);
  const dx0 = v0x / d0;
  const dy0 = v0y / d0;
  const start0x = p0.x + dx0 * radius;
  const start0y = p0.y + dy0 * radius;

  // Replace the simple Z with the final corner
  path = path.substring(0, path.length - 2); // remove " Z" if I added it above
  path += ` Q ${p0.x} ${p0.y} ${start0x} ${start0y} Z`;

  return path;
};
