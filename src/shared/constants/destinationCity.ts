export type RegionId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type RegionKey = 'seoul' | 'gyeonggi' | 'gangwon' | 'chungcheong' | 'jeolla' | 'gyeongsang' | 'jeju';

// prettier-ignore
export type DestinationCityId =
    | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 // 서울
    | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 // 경기
    | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 309 | 310 // 강원
    | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 // 충청
    | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 509 | 510 // 전라
    | 601 | 602 | 603 | 604 | 605 | 606 | 607 | 608 | 609 | 610 // 경상
    | 701 | 702 | 703 | 704; // 제주

export interface DestinationCity {
  id: DestinationCityId;
  name: {
    korean: string;
    english: string;
  };
  regionId: RegionId;
}

export interface Region {
  id: RegionId;
  key: RegionKey;
  name: {
    korean: string;
    english: string;
  };
  cities: DestinationCity[];
}

export const DESTINATION_CITIES: DestinationCity[] = [
  // 서울 (100번대)
  { id: 101, name: { korean: '종로·중구', english: 'Jongno·Jung-gu' }, regionId: 1 },
  { id: 102, name: { korean: '강남', english: 'Gangnam' }, regionId: 1 },
  { id: 103, name: { korean: '홍대·마포', english: 'Hongdae·Mapo' }, regionId: 1 },
  { id: 104, name: { korean: '여의도', english: 'Yeouido' }, regionId: 1 },
  { id: 105, name: { korean: '이태원·용산', english: 'Itaewon·Yongsan' }, regionId: 1 },
  { id: 106, name: { korean: '성수·건대', english: 'Seongsu·Konkuk Univ.' }, regionId: 1 },
  { id: 107, name: { korean: '잠실', english: 'Jamsil' }, regionId: 1 },
  { id: 108, name: { korean: '북촌·삼청동', english: 'Bukchon·Samcheong-dong' }, regionId: 1 },
  { id: 109, name: { korean: '강북', english: 'Gangbuk' }, regionId: 1 },
  { id: 110, name: { korean: '서울 기타', english: 'Seoul Others' }, regionId: 1 },

  // 경기 (200번대)
  { id: 201, name: { korean: '수원', english: 'Suwon' }, regionId: 2 },
  { id: 202, name: { korean: '성남', english: 'Seongnam' }, regionId: 2 },
  { id: 203, name: { korean: '고양', english: 'Goyang' }, regionId: 2 },
  { id: 204, name: { korean: '용인', english: 'Yongin' }, regionId: 2 },
  { id: 205, name: { korean: '부천', english: 'Bucheon' }, regionId: 2 },
  { id: 206, name: { korean: '안산', english: 'Ansan' }, regionId: 2 },
  { id: 207, name: { korean: '남양주', english: 'Namyangju' }, regionId: 2 },
  { id: 208, name: { korean: '화성', english: 'Hwaseong' }, regionId: 2 },
  { id: 209, name: { korean: '파주', english: 'Paju' }, regionId: 2 },
  { id: 210, name: { korean: '가평', english: 'Gapyeong' }, regionId: 2 },

  // 강원 (300번대)
  { id: 301, name: { korean: '강릉', english: 'Gangneung' }, regionId: 3 },
  { id: 302, name: { korean: '속초', english: 'Sokcho' }, regionId: 3 },
  { id: 303, name: { korean: '양양', english: 'Yangyang' }, regionId: 3 },
  { id: 304, name: { korean: '춘천', english: 'Chuncheon' }, regionId: 3 },
  { id: 305, name: { korean: '평창', english: 'Pyeongchang' }, regionId: 3 },
  { id: 306, name: { korean: '정선', english: 'Jeongseon' }, regionId: 3 },
  { id: 307, name: { korean: '태백', english: 'Taebaek' }, regionId: 3 },
  { id: 308, name: { korean: '동해', english: 'Donghae' }, regionId: 3 },
  { id: 309, name: { korean: '삼척', english: 'Samcheok' }, regionId: 3 },
  { id: 310, name: { korean: '홍천', english: 'Hongcheon' }, regionId: 3 },

  // 충청 (400번대)
  { id: 401, name: { korean: '대전', english: 'Daejeon' }, regionId: 4 },
  { id: 402, name: { korean: '청주', english: 'Cheongju' }, regionId: 4 },
  { id: 403, name: { korean: '천안', english: 'Cheonan' }, regionId: 4 },
  { id: 404, name: { korean: '충주', english: 'Chungju' }, regionId: 4 },
  { id: 405, name: { korean: '보령', english: 'Boryeong' }, regionId: 4 },
  { id: 406, name: { korean: '태안', english: 'Taean' }, regionId: 4 },
  { id: 407, name: { korean: '공주', english: 'Gongju' }, regionId: 4 },
  { id: 408, name: { korean: '제천', english: 'Jecheon' }, regionId: 4 },

  // 전라 (500번대)
  { id: 501, name: { korean: '전주', english: 'Jeonju' }, regionId: 5 },
  { id: 502, name: { korean: '광주', english: 'Gwangju' }, regionId: 5 },
  { id: 503, name: { korean: '여수', english: 'Yeosu' }, regionId: 5 },
  { id: 504, name: { korean: '순천', english: 'Suncheon' }, regionId: 5 },
  { id: 505, name: { korean: '목포', english: 'Mokpo' }, regionId: 5 },
  { id: 506, name: { korean: '군산', english: 'Gunsan' }, regionId: 5 },
  { id: 507, name: { korean: '보성', english: 'Boseong' }, regionId: 5 },
  { id: 508, name: { korean: '담양', english: 'Damyang' }, regionId: 5 },
  { id: 509, name: { korean: '완도', english: 'Wando' }, regionId: 5 },
  { id: 510, name: { korean: '남원', english: 'Namwon' }, regionId: 5 },

  // 경상 (600번대)
  { id: 601, name: { korean: '부산', english: 'Busan' }, regionId: 6 },
  { id: 602, name: { korean: '대구', english: 'Daegu' }, regionId: 6 },
  { id: 603, name: { korean: '울산', english: 'Ulsan' }, regionId: 6 },
  { id: 604, name: { korean: '경주', english: 'Gyeongju' }, regionId: 6 },
  { id: 605, name: { korean: '포항', english: 'Pohang' }, regionId: 6 },
  { id: 606, name: { korean: '안동', english: 'Andong' }, regionId: 6 },
  { id: 607, name: { korean: '통영', english: 'Tongyeong' }, regionId: 6 },
  { id: 608, name: { korean: '거제', english: 'Geoje' }, regionId: 6 },
  { id: 609, name: { korean: '창원', english: 'Changwon' }, regionId: 6 },
  { id: 610, name: { korean: '진주', english: 'Jinju' }, regionId: 6 },

  // 제주 (700번대)
  { id: 701, name: { korean: '제주시', english: 'Jeju City' }, regionId: 7 },
  { id: 702, name: { korean: '서귀포', english: 'Seogwipo' }, regionId: 7 },
  { id: 703, name: { korean: '애월', english: 'Aewol' }, regionId: 7 },
  { id: 704, name: { korean: '성산', english: 'Seongsan' }, regionId: 7 },
];

export const REGIONS: Region[] = [
  {
    id: 1,
    key: 'seoul',
    name: {
      korean: '서울',
      english: 'Seoul',
    },
    cities: DESTINATION_CITIES.filter((city) => city.regionId === 1),
  },
  {
    id: 2,
    key: 'gyeonggi',
    name: {
      korean: '경기',
      english: 'Gyeonggi',
    },
    cities: DESTINATION_CITIES.filter((city) => city.regionId === 2),
  },
  {
    id: 3,
    key: 'gangwon',
    name: {
      korean: '강원',
      english: 'Gangwon',
    },
    cities: DESTINATION_CITIES.filter((city) => city.regionId === 3),
  },
  {
    id: 4,
    key: 'chungcheong',
    name: {
      korean: '충청',
      english: 'Chungcheong',
    },
    cities: DESTINATION_CITIES.filter((city) => city.regionId === 4),
  },
  {
    id: 5,
    key: 'jeolla',
    name: {
      korean: '전라',
      english: 'Jeolla',
    },
    cities: DESTINATION_CITIES.filter((city) => city.regionId === 5),
  },
  {
    id: 6,
    key: 'gyeongsang',
    name: {
      korean: '경상',
      english: 'Gyeongsang',
    },
    cities: DESTINATION_CITIES.filter((city) => city.regionId === 6),
  },
  {
    id: 7,
    key: 'jeju',
    name: {
      korean: '제주',
      english: 'Jeju',
    },
    cities: DESTINATION_CITIES.filter((city) => city.regionId === 7),
  },
];

export const DESTINATION_CITY_MAP: Record<DestinationCityId, DestinationCity> = DESTINATION_CITIES.reduce(
  (acc, city) => {
    acc[city.id] = city;
    return acc;
  },
  {} as Record<DestinationCityId, DestinationCity>,
);

export const REGION_MAP: Record<RegionId, Region> = REGIONS.reduce(
  (acc, region) => {
    acc[region.id] = region;
    return acc;
  },
  {} as Record<RegionId, Region>,
);
