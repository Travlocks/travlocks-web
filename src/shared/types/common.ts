// 성공 페이로드
export interface SuccessPayload<T> {
  isSuccess: boolean;
  successCode: string;
  successMessage: string;
  data: T;
}
