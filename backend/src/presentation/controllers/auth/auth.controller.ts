import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { authResponseDto, LoginDto } from '@app/dto/auth';
import { AuthService } from '@infrastructure/services/auth/auth.service';
import {
  ApiResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: authResponseDto,
  })
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
