import { VerifyUserUseCase } from '@app/use-cases/user/verify-email.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly verifyUserUseCase: VerifyUserUseCase) {}

  async verifyToken(token: string) {
    return this.verifyUserUseCase.execute(token);
  }
}
