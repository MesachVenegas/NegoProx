import { Injectable } from '@nestjs/common';

import { VerifyUserUseCase } from '@app/use-cases/user/verify-email.use-case';
import { UserServiceInterface } from '@app/interfaces/user/user-service.interface';
import { ResetPasswordUseCase } from '@app/use-cases/user/reset-password.use-case';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly verifyUserUseCase: VerifyUserUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  async verifyToken(token: string) {
    return this.verifyUserUseCase.execute(token);
  }

  async renewPassword(token: string, newPassword: string) {
    return this.resetPasswordUseCase.execute(token, newPassword);
  }
}
