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
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';

import {
  AuthenticateUserUseCase,
  LogOutUserUseCase,
} from '@/application/auth/use-cases';
import { LoginDto } from '../dto/auth/login.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { Public } from '@/shared/decorators/public.decorator';
import { AuthResponseDto } from '../dto/auth/auth-response.dto';
import { CsrfService } from '@/infrastructure/services/csrf.service';
import { UserProfileAccDto } from '../dto/user/user-profile-acc.dto';
import { CreateLocalUserUseCase } from '@/application/user/use-cases';
import { UserPrismaRepository } from '../repositories/user.repository';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { RegisterLocalUserDto } from '../dto/user/register-local-user.dto';
import { HttpErrorResponseDto } from '@/infrastructure/dto/http-error-response.dto';
import { TokenVersionPrismaRepository } from '../repositories/token-version.repository';
import { VerifyUserUseCase } from '@/application/auth/use-cases/verify-user';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly securityService: CsrfService,
    private readonly userPrismaRepository: UserPrismaRepository,
    private readonly tokenVersionPrismaRepository: TokenVersionPrismaRepository,
  ) {}

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
  ): Promise<AuthResponseDto | void> {
    if (!req.user) return;
    const user = plainToInstance(UserProfileAccDto, req.user);
    const Authenticate = new AuthenticateUserUseCase(
      this.jwtService,
      this.tokenVersionPrismaRepository,
    );

    this.securityService.generateCsrfToken(req, res);
    const authenticate = await Authenticate.execute(user, res);

    res.json(plainToInstance(AuthResponseDto, authenticate));
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ description: 'Login with google account' })
  googleAuth() {}

  @Public()
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
    const Authenticate = new AuthenticateUserUseCase(
      this.jwtService,
      this.tokenVersionPrismaRepository,
    );

    this.securityService.generateCsrfToken(req, res);
    const authenticate = await Authenticate.execute(user, res);

    res.json(plainToInstance(AuthResponseDto, authenticate));
  }

  @Public()
  @Post('register')
  @ApiOkResponse({ type: UserProfileAccDto })
  @ApiOperation({ description: 'Register a new user with email and password' })
  async registerLocalUser(@Body() dto: RegisterLocalUserDto) {
    const Register = new CreateLocalUserUseCase(this.userPrismaRepository);
    const user = await Register.execute(dto);

    return plainToInstance(UserProfileAccDto, user);
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
    const Logout = new LogOutUserUseCase(this.tokenVersionPrismaRepository);
    const result = await Logout.execute(user.id);

    if (!result) throw new UnauthorizedException('User not found or not exist');

    return {
      message: 'Logout successful',
    };
  }


  @Get('verify')
  @UseGuards(JwtGuard)
  async verifyUser(@CurrentUser() user: UserProfileAccDto) {
    const Verify = new VerifyUserUseCase(this.userPrismaRepository);
    const result = await Verify.execute(user.id);

    return result;
  }

  // TODO: Implement email validation by token
  // TODO: Implement forgot password
  // TODO: Implement reset password
}
