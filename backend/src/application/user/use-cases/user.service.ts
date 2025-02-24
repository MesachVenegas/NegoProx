import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';

import {
  PaginationDto,
  PaginationResponseDto,
} from '@/infrastructure/dto/pagination.dto';
import { hashPassword } from '@/shared/utils/hash.util';
import { UpdateUserDto } from '@/infrastructure/dto/user/update-user.dto';
import { ResponseUserDto } from '@/infrastructure/dto/user/user-response.dto';
import { UserRepository } from '@/infrastructure/repositories/user.repository';
import { UserProfileAccDto } from '@/infrastructure/dto/user/user-profile-acc.dto';
import { QuerySearchUserDto } from '@/infrastructure/dto/user/user-query-search.dto';
import { RegisterLocalUserDto } from '@/infrastructure/dto/user/register-local-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async loadAllUsers({
    page = 1,
    limit = 10,
    order = 'desc',
  }: PaginationDto): Promise<PaginationResponseDto<ResponseUserDto[]>> {
    const skip = (page - 1) * limit;

    const [totalUsers, users] = await Promise.all([
      await this.repo.countUsers(),
      await this.repo.getAllUsers({ skip, limit, order }),
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

  async createLocalUser(data: RegisterLocalUserDto): Promise<ResponseUserDto> {
    data.password = await hashPassword(data.password);
    const user = await this.repo.createLocalUser(data);
    return plainToInstance(ResponseUserDto, user);
  }

  async updateUser(dto: UpdateUserDto, id: string): Promise<UserProfileAccDto> {
    const exist = await this.repo.findUser({ id: id });
    if (!exist) throw new NotFoundException('User not found, or not exist');
    const user = await this.repo.updateUser(dto, id);
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
