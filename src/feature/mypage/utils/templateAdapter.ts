import type { Template as TemplateCardViewModel, TravelTheme } from '@/feature/template/template.types';
import type { TemplateCardDto } from '../types/mypage.type';

const TRAVEL_THEMES = ['자연', '문화', '맛집', '힐링', '액티비티', '로컬'] as const;

const isTravelTheme = (value: string): value is TravelTheme => {
  return TRAVEL_THEMES.includes(value as TravelTheme);
};

export const toTemplateCard = (template: TemplateCardDto): TemplateCardViewModel => ({
  type: 'popular',
  templateId: template.templateId,
  coverImageUrl: template.coverImgUrl,
  title: template.title,
  travelTheme: isTravelTheme(template.travelTheme) ? template.travelTheme : '로컬',
  authorName: template.ownerNickname,
  authorMemberId: template.memberId,
  avgRating: template.rating,
  starCount: template.favoriteCount,
  remixCount: template.favoriteCount,
  tag: '공개 템플릿',
});
