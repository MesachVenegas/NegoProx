import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
  Body,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Public } from '@/shared/core/decorators/public.decorator';
import { UserProfileAccDto } from '../user/dto/user-profile-acc.dto';
import { RegisterLocalUserDto } from '../user/dto/register-local-user.dto';
import { HttpErrorResponseDto } from '@/shared/dto/http-error-response.dto';
import { CurrentUser } from '@/shared/core/decorators/current-user.decorator';
import { plainToInstance } from 'class-transformer';
// import { CsrfGuard } from '@/security/guards/csrf.guard';

@ApiTags('Authentication')
@Controller('auth')
// @UseGuards(CsrfGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ description: 'Login with email and password' })
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiUnauthorizedResponse({
    description: 'Credentials are not valid, user disabled',
    type: HttpErrorResponseDto,
  })
  @ApiConflictResponse({
    description: 'User signed with external provider',
    type: HttpErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found or not exist',
    type: HttpErrorResponseDto,
  })
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<AuthResponseDto | undefined> {
    if (!req.user) return;
    const user = plainToInstance(UserProfileAccDto, req.user);
    const result = await this.authService.authResponse(user);
    res.json(result);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ description: 'Login with google account' })
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    description: 'Callback for google login, and return session token',
  })
  @ApiOkResponse({ type: AuthResponseDto })
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    if (!req.user)
      throw new UnauthorizedException(
        'Something went wrong, the user cannot be authenticated',
      );
    const user = plainToInstance(UserProfileAccDto, req.user);
    const response = await this.authService.authResponse(user);
    res.json(response);
  }

  @Post('register')
  @ApiOkResponse({ type: UserProfileAccDto })
  @ApiOperation({ description: 'Register a new user with email and password' })
  async registerLocalUser(@Body() dto: RegisterLocalUserDto) {
    return await this.authService.registerLocalUser(dto);
  }

  @Get('logout')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Close session and invalidate JWT token' })
  @ApiOkResponse({
    example: {
      status: 'success',
      timestamp: '2025-02-18T00:17:10.840Z',
      data: {
        message: 'Logout successful',
      },
    },
  })
  async logout(@CurrentUser() user: UserProfileAccDto) {
    await this.authService.logout(user);
    return {
      message: 'Logout successful',
    };
  }

  // TODO: Implement email validation by token
  // TODO: Implement forgot password
  // TODO: Implement reset password
}
