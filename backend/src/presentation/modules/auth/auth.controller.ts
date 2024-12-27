import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import {
  authResponseDto,
  EmailRequestDto,
  LoginDto,
  RegisterDto,
  RegisterDtoResponse,
} from '@app/dto/auth';
import { AuthService } from '@infrastructure/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleLogin(@Req() _req: Request) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: any) {
    const token = this.authService.googleAuthCallback(req.user);

    return { access_token: token };
  }

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

  @Post('renew-password')
  @ApiNotFoundResponse({ description: 'User not found' })
  async requestPasswordReset(
    @Body() data: EmailRequestDto,
  ): Promise<{ message: string }> {
    return this.authService.requestPasswordReset(data.email);
  }
}
