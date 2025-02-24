import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';

import { AuthService } from '../use-case/auth.service';
import { UserTokenVersionDto } from '@/infrastructure/dto/user/user-token.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateLocalUser(email, password);
    return plainToInstance(UserTokenVersionDto, user);
  }
}
