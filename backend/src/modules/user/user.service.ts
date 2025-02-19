import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import {
  PaginationDto,
  PaginationResponseDto,
} from '@/shared/dto/pagination.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from '@/shared/utils/hash.util';
import { ResponseUserDto } from './dto/user-response.dto';
import { UserProfileAccDto } from './dto/user-profile-acc.dto';
import { QuerySearchUserDto } from './dto/user-query-search.dto';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async loadAllUsers({
    page = 1,
    limit = 10,
    sortBy = 'registerAt',
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
      data: plainToInstance(ResponseUserDto, users),
    };
  }

  async findUserByQuery(data: QuerySearchUserDto): Promise<UserProfileAccDto> {
    const result = await this.repo.findUser(data);
    return plainToInstance(UserProfileAccDto, result);
  }

  async createLocalUser(data: RegisterLocalUserDto): Promise<User> {
    data.password = await hashPassword(data.password);
    return this.repo.createLocalUser(data);
  }

  async updateUser(dto: UpdateUserDto, id: string): Promise<UserProfileAccDto> {
    const exist = await this.repo.findUser({ id: id });
    if (!exist) throw new NotFoundException('User not found, or not exist');
    const user = await this.repo.update(dto, id);
    return plainToInstance(UserProfileAccDto, user);
  }

  async disable(id: string): Promise<UserProfileAccDto> {
    const user = await this.repo.findUser({ id: id });
    if (!user) throw new NotFoundException('User not found, or not exist');
    const disabledUser = await this.repo.disableAccount(id);
    return plainToInstance(UserProfileAccDto, disabledUser);
  }

  async updatePassword(id: string, password: string) {
    return await this.repo.updatePassword(id, password);
  }
}
