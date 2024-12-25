import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { UserService } from '@infrastructure/services/user/user.service';
import { ResetPasswordDto } from '@app/dto/user';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  VerifyEmailErrorResponseDto,
  VerifyEmailResponseDto,
} from '@app/dto/user/verify-email.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('verify')
  @ApiOkResponse({
    description: 'Email verified',
    type: VerifyEmailResponseDto,
  })
  @ApiConflictResponse({
    description: 'Token expired or Email already confirmed',
    type: VerifyEmailErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid token or no token provided',
    type: VerifyEmailErrorResponseDto,
  })
  async verifyUser(@Query('token') token: string) {
    if (!token) throw new BadRequestException('No token provided');
    await this.userService.verifyToken(token);
    return { message: 'Email verified' };
  }

  @Post('reset-password')
  @ApiOkResponse({ description: 'Password reset successfully' })
  @ApiConflictResponse({
    description: 'Token expired or User not found or not exists',
    type: VerifyEmailErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid token or no token provided',
    type: VerifyEmailErrorResponseDto,
  })
  async resetPassword(
    @Param('token') token: string,
    @Body() data: ResetPasswordDto,
  ) {
    await this.userService.renewPassword(token, data);
  }
}
