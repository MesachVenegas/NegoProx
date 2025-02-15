import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';
import { hashPassword } from '@/shared/common/utils/hash.util';
import { ResponseUserDto } from './dto/user-response.dto';
import { UserProfileAccDto } from './dto/user-profile-acc.dto';
import { QuerySearchUserDto } from './dto/user-query-search.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '@/shared/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async loadAllUsers({
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc',
  }: PaginationDto): Promise<PaginationResponseDto<ResponseUserDto[]>> {
    const skip = (page - 1) * limit;

    const [totalUsers, users] = await Promise.all([
      await this.repo.countUsers(),
      await this.repo.getAllUsers({ skip, limit, sortBy, order }),
    ]);

    return {
      pages: totalUsers ? Math.ceil(totalUsers / limit) : 1,
      prev: page > 1 ? page - 1 : null,
      next: page * limit < totalUsers ? page + 1 : null,
      limit,
      data: users.map((user) => new ResponseUserDto(user)),
    };
  }

  async findUserByQuery(
    data: QuerySearchUserDto,
  ): Promise<UserProfileAccDto | null> {
    const result = await this.repo.findUser(data);
    return result ? new UserProfileAccDto(result) : null;
  }

  async createLocalUser(data: RegisterLocalUserDto): Promise<User> {
    data.password = hashPassword(data.password);
    const newUser = new User(data, data.password);
    return this.repo.createLocalUser(newUser);
  }
}
