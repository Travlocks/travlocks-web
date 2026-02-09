import type { ResponseEmailVerificationConfirmDto, ResponseEmailVerificationDto } from '../types/auth';

const handleMutationSuccess = (
  res: ResponseEmailVerificationDto | ResponseEmailVerificationConfirmDto,
  type: 'send' | 'confirm',
) => {
  if (!res.isSuccess) return;

  switch (type) {
    case 'send':
      return { verificationId: (res as ResponseEmailVerificationDto).data.verificationId };

    case 'confirm':
      return { signupToken: (res as ResponseEmailVerificationConfirmDto).data?.signupToken };
  }
};

export default handleMutationSuccess;
