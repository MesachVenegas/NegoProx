import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';

import { LoginLocalUseCase } from '../../application/auth/use-cases';
import { UserProfileAccDto } from '@/infrastructure/dto/user/user-profile-acc.dto';
import { AuthPrismaRepository } from '@/infrastructure/repositories/auth.repository';

import { LoginDto } from '../dto/auth/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authRepository: AuthPrismaRepository) {
    super({ usernameField: 'email' });
  }

  async validate(email: LoginDto['email'], password: LoginDto['password']) {
    const useCase = new LoginLocalUseCase(this.authRepository);
    const user = await useCase.execute(email, password);

    return plainToInstance(UserProfileAccDto, user);
  }
}
