import { Body, Controller, Post } from '@nestjs/common';

import { LoginDto } from '@app/dto/auth';
import { AuthService } from '@infrastructure/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
