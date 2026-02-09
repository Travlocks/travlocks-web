import axios from 'axios';
import type { ApiError } from '@/shared/types/error';

const handleMutationError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const serverError = (error as ApiError).response?.data;

    if (!serverError?.isSuccess) {
      return serverError?.errorMessage;
    }
  }
  return undefined;
};

export default handleMutationError;
