/**
 * 여행 테마 타입
 *
 * @remarks
 * 트래블록스에서 제공하는 여행 테마 목록입니다.
 * 템플릿 카드 우측 상단에 표시되며, 각 테마별로 고유한 색상이 적용됩니니다.
 */
export type TravelTheme = '자연' | '문화' | '맛집' | '힐링' | '액티비티' | '로컬';

/**
 * 템플릿 공통 인터페이스
 *
 * @remarks
 * 모든 템플릿 타입(추천/인기)이 공유하는 기본 필드를 정의합니니다.
 */
export interface TemplateBase {
  /** 템플릿 고유 식별자 */
  templateId: number;

  /** 템플릿 제목 */
  title: string;

  /** 템플릿 커버 이미지 URL */
  coverImageUrl: string;

  /** 여행 테마 */
  travelTheme: TravelTheme;
}

/**
 * 추천 템플릿 인터페이스
 *
 * @remarks
 * AI로 추천되는 템플릿을 위한 타입입니다.
 * 지역, 여행 일수, 설명 등의 정보를 포함합니다.
 */
export interface RecommendedTemplateFields extends TemplateBase {
  /** 템플릿 타입 구분자 */
  type: 'recommended';

  /** 템플릿 상세 설명 */
  description: string;

  /** 여행 지역 */
  region: string;

  /** 여행 일수 */
  tripDays: string;
}

/**
 * 인기 템플릿 인터페이스
 *
 * @remarks
 * 사용자들에게 인기가 많은 템플릿을 위한 타입입니다.
 * 작성자, 평점, 리믹스 수 등의 정보를 포함합니니다.
 */
export interface PopularTemplateFields extends TemplateBase {
  /** 템플릿 타입 구분자 */
  type: 'popular';

  /** 템플릿 태그 */
  tag: string;

  /** 템플릿 작성자 이름 */
  authorName: string;

  /** 평균 평점 */
  avgRating: number;

  /** 즐겨찾기 개수 */
  starCount: number;

  /** 리믹스 된 횟수 */
  remixCount: number;
}

/**
 * 템플릿 유니온 타입
 *
 * @remarks
 * 추천 템플릿 또는 인기 템플릿 중 하나를 나타냅니다.
 * `type` 필드를 통해 타입 가드로 구분할 수 있습니니다.
 *
 * @example
 * ```ts
 * function processTemplate(template: Template) {
 *   if (template.type === 'recommended') {
 *     console.log(template.region);
 *   } else {
 *     console.log(template.authorName);
 *   }
 * }
 * ```
 */
export type Template = RecommendedTemplateFields | PopularTemplateFields;
