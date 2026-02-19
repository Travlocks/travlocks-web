const convertIdToCity = (num: number) => {
  const mapping: Record<number, string> = {
    1: '서울',
    2: '경기',
    3: '인천',
    4: '강원',
    5: '충청',
    6: '전라',
    7: '경상',
    8: '제주',
  };

  const first = Math.floor(num / 100);

  return mapping[first];
};

export default convertIdToCity;
