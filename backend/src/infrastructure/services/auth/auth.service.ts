import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserRegisteredDTO } from '@app/dto/user';
import { LoginDto, RegisterDto } from '@app/dto/auth';
import { RegisterUserUseCase, LoginUserUseCase } from '@app/use-cases/user';
import { AuthServiceInterface } from '@app/interfaces/auth/auth-service.interface';
import { RequestResetPasswordUseCase } from '@app/use-cases/user/request-reset-password.use-case';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly requestResetPasswordUseCase: RequestResetPasswordUseCase,
  ) {}

  async login(data: LoginDto) {
    const user = await this.loginUserUseCase.execute(data);

    return { access_token: this.generateToken(user) };
  }

  async register(data: RegisterDto) {
    const entry = await this.registerUserUseCase.execute(data);

    return {
      access_token: this.generateToken(entry.user),
      message: entry.message,
    };
  }

  async requestPasswordReset(email: string): Promise<{ message: string }> {
    return this.requestResetPasswordUseCase.execute(email);
  }

  /**
   * Generates a JWT token for the given user.
   * @param user The user to generate the token for.
   * @returns The generated JWT token.
   */
  private generateToken(user: Partial<UserRegisteredDTO>) {
    const payload = { sub: user.id, email: user.email, role: user.user_role };
    return this.jwtService.sign(payload);
  }
}
