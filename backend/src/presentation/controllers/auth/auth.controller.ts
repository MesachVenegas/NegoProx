import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import {
  authResponseDto,
  LoginDto,
  RegisterDto,
  RegisterDtoResponse,
} from '@app/dto/auth';
import { AuthService } from '@infrastructure/services/auth/auth.service';
import {
  ApiResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
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
  async login(@Body() data: LoginDto): Promise<authResponseDto> {
    return this.authService.login(data);
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: RegisterDtoResponse,
  })
  @ApiConflictResponse({ description: 'User already exists' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async register(@Body() data: RegisterDto): Promise<RegisterDtoResponse> {
    return this.authService.register(data);
  }
}
