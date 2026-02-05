import type { Connector, Point } from '@/shared/components/Block/blockShape';
import type { CategoryType } from '../types/block';

export interface BlockShapeConfig {
  w: number;
  h: number;
  points: Point[];
  connectors: Connector[];
}

/**
 * 시간 문자열을 파싱하여 숫자로 변환
 * @param duration - "1시간", "2시간", "1박" 등의 문자열
 * @returns 숫자 값 (파싱 실패 시 1)
 */
export function parseDuration(duration: string): { value: number; isNight: boolean } {
  const hourMatch = duration.match(/(\d+)시간/);
  const nightMatch = duration.match(/(\d+)박/);

  if (hourMatch) {
    return { value: parseInt(hourMatch[1], 10), isNight: false };
  }
  if (nightMatch) {
    return { value: parseInt(nightMatch[1], 10), isNight: true };
  }

  return { value: 1, isNight: false };
}

/**
 * 시간별로 블록 모양을 생성
 * - 1시간: 140x125 (단일 블록)
 * - 2시간: 140x250 (세로 L자)
 * - 3시간: 265x125 (가로 L자)
 * - 4시간 이상: 265x250 (큰 L자)
 * - 숙소(박): 390x250 (매우 큰 블록)
 * - 시작: 186x87 (작은 블록)
 */
export function getBlockShapeByDuration(duration: string, category: CategoryType): BlockShapeConfig {
  const { value, isNight } = parseDuration(duration);

  if (isNight || category === '숙소') {
    return createAccommodationShape();
  }

  if (value <= 1) {
    return create1HourShape();
  } else if (value === 2) {
    return create2HourShape();
  } else if (value === 3) {
    return create3HourShape();
  } else {
    return create4PlusHourShape();
  }
}

/**
 * 1시간 블록: 140x125 단일 사각형
 */
function create1HourShape(): BlockShapeConfig {
  const w = 140;
  const h = 125;

  const points: Point[] = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: h },
    { x: 0, y: h },
  ];

  const connectors: Connector[] = [
    { type: 'plug', edgeIndex: 0, align: 'start' },
    { type: 'socket', edgeIndex: 1, align: 'end' },
    { type: 'socket', edgeIndex: 2, align: 'start' },
    { type: 'plug', edgeIndex: 3, align: 'end' },
  ];

  return { w, h, points, connectors };
}

/**
 * 2-3시간 공통 블록: 140x250 세로 블록
 */
function createVerticalRectangleShape(): BlockShapeConfig {
  const w = 140;
  const h = 250;

  const points: Point[] = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: h },
    { x: 0, y: h },
  ];

  const connectors: Connector[] = [
    { type: 'plug', edgeIndex: 0, align: 'start' },
    { type: 'socket', edgeIndex: 1, align: 'end' },
    { type: 'socket', edgeIndex: 2, align: 'start' },
    { type: 'plug', edgeIndex: 3, align: 'end' },
  ];

  return { w, h, points, connectors };
}

/**
 * 2시간 블록: 140x250 세로 블록
 */
function create2HourShape(): BlockShapeConfig {
  return createVerticalRectangleShape();
}

/**
 * 3시간 블록: 140x250 세로 블록
 */
function create3HourShape(): BlockShapeConfig {
  return createVerticalRectangleShape();
}

/**
 * 4시간 이상 블록: 265x250 L자형 (4시간)
 * L자 형태: 상단 왼쪽 사각형 + 하단 오른쪽으로 확장
 */
function create4PlusHourShape(): BlockShapeConfig {
  const w = 265;
  const h = 250;

  const points: Point[] = [
    { x: 0, y: 0 },
    { x: 140, y: 0 },
    { x: 140, y: 125 },
    { x: w, y: 125 },
    { x: w, y: h },
    { x: 0, y: h },
  ];

  const connectors: Connector[] = [
    { type: 'plug', edgeIndex: 0, align: 'start' },
    { type: 'socket', edgeIndex: 3, align: 'end' },
    { type: 'socket', edgeIndex: 4, align: 'start' },
    { type: 'plug', edgeIndex: 5, align: 'end' },
  ];

  return { w, h, points, connectors };
}

/**
 * 숙소 블록: 390x250 매우 큰 L자형 (숙소)
 * L자 형태: 상단 왼쪽 사각형 + 하단 오른쪽으로 확장 + 하단 왼쪽 모서리
 */
function createAccommodationShape(): BlockShapeConfig {
  const w = 390;
  const h = 250;

  const points: Point[] = [
    { x: 0, y: 0 },
    { x: 265, y: 0 },
    { x: 265, y: 125 },
    { x: w, y: 125 },
    { x: w, y: h },
    { x: 140, y: h },
    { x: 140, y: 125 },
    { x: 0, y: 125 },
  ];

  const connectors: Connector[] = [
    { type: 'plug', edgeIndex: 0, align: 'start' },
    { type: 'socket', edgeIndex: 3, align: 'end' },
    { type: 'socket', edgeIndex: 4, align: 'start' },
    { type: 'plug', edgeIndex: 7, align: 'end' },
  ];

  return { w, h, points, connectors };
}

/**
 * 시작 블록: 186x87 작은 사각형
 */
export function createStartBlockShape(): BlockShapeConfig {
  const w = 186;
  const h = 87;

  const points: Point[] = [
    { x: 0, y: 0 },
    { x: 186, y: 0 },
    { x: 186, y: 87 },
    { x: 0, y: 87 },
  ];

  const connectors: Connector[] = [{ type: 'socket', edgeIndex: 1, align: 'center' }];

  return { w, h, points, connectors };
}
