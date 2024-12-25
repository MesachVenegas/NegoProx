import { Injectable } from '@nestjs/common';

import { VerifyUserUseCase } from '@app/use-cases/user/verify-email.use-case';
import { ResetPasswordUseCase } from '@app/use-cases/user/reset-password.use-case';
import { ResetPasswordDto } from '@app/dto/user';

@Injectable()
export class UserService {
  constructor(
    private readonly verifyUserUseCase: VerifyUserUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  async verifyToken(token: string) {
    return this.verifyUserUseCase.execute(token);
  }

  async renewPassword(token: string, data: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(token, data.password);
  }
}
