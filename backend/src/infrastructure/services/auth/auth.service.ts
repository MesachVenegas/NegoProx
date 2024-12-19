import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { LoginDto } from '@app/dto/auth';
import { User } from '@core/entities/user.entity';
import { LoginUserUseCase } from '@app/use-cases/login-user.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  async login(data: LoginDto) {
    const user = await this.loginUserUseCase.execute(data);

    return this.generateToken(user);
  }

  private generateToken(user: Partial<User>) {
    const payload = { sub: user.id, email: user.email, role: user.user_role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
