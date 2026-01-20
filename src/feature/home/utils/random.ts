export type PRNG = () => number;

// mulberry32: 빠르고 배경 랜덤에 충분
export function mulberry32(seed: number | string): PRNG {
  // 랜덤 시드 생성
  let t = Number(seed) >>> 0;
  return () => {
    // 랜덤 숫자 생성
    t += 0x6d2b79;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    // 랜덤 숫자 생성
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    // 랜덤 숫자 생성
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// 랜덤 숫자(float) 생성 함수
export function randFloat(rng: PRNG, min: number, max: number) {
  return min + (max - min) * rng();
}

// 랜덵 숫자(int) 생성 함수
export function randInt(rng: PRNG, min: number, max: number) {
  return Math.floor(randFloat(rng, min, max + 1));
}

// 랜덤 배열 요소 선택 함수
export function pick<T>(rng: PRNG, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

// 랜덤 숫자 클램핑 함수
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
