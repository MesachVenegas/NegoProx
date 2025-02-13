import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { FindQuery } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.loadAllUsers();
    if (!users) throw new NotFoundException('No users found');
    return users;
  }

  @Get('find')
  async getUser(@Query() query: FindQuery) {
    const user = await this.userService.findUserByQuery(query);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
