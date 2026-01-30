export interface CommonResponse<T> {
  isSuccess: boolean;
  successCode: string;
  successMessage: string;
  data: T;
}
