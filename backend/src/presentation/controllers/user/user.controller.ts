import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { UserService } from '@infrastructure/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('verify')
  async verifyUser(@Query('token') token: string) {
    if (!token) throw new BadRequestException('No token provided');
    await this.userService.verifyToken(token);
    return { message: 'Email verified' };
  }
}
