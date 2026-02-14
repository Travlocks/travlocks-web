import { useQuery } from '@tanstack/react-query';
import { getMemberProfile } from '../apis/mypage';
import type { MemberProfile } from '../types/mypage.type';

export const useMemberProfileQuery = (memberId?: number, page = 0) => {
  return useQuery<MemberProfile>({
    queryKey: ['member-profile', memberId, page],
    queryFn: async () => {
      if (typeof memberId !== 'number' || Number.isNaN(memberId)) {
        throw new Error('memberId is required');
      }
      const response = await getMemberProfile(memberId, page);
      return response.data;
    },
    enabled: typeof memberId === 'number' && !Number.isNaN(memberId),
  });
};
