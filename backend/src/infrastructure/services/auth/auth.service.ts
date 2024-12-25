import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserRegisteredDTO } from '@app/dto/user';
import { LoginDto, RegisterDto } from '@app/dto/auth';
import { RegisterUserUseCase, LoginUserUseCase } from '@app/use-cases/user';
import { AuthServiceInterface } from '@app/interfaces/auth-service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
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

  private generateToken(user: Partial<UserRegisteredDTO>) {
    const payload = { sub: user.id, email: user.email, role: user.user_role };
    return this.jwtService.sign(payload);
  }
}
