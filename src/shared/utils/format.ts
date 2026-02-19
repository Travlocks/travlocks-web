/**
 * 숫자를 소수점 첫째 자리까지 포맷팅합니다.
 * (예: 4 -> "4.0", 4.5 -> "4.5", 4.56 -> "4.6")
 *
 * @param value - 포맷팅할 숫자
 * @returns 소수점 첫째 자리까지 표시된 문자열
 */
export const formatOneDecimal = (value: number | string | undefined | null): string => {
  if (value === undefined || value === null || value === '') return '0.0';

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) return '0.0';

  return num.toFixed(1);
};
