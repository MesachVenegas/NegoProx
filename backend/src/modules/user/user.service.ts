import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { FindQuery } from './interfaces/common.interface';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';
import { hashPassword } from '@/shared/common/utils/hash.util';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async loadAllUsers(): Promise<User[]> {
    return this.repo.getAllUsers();
  }

  async findUserByQuery(data: FindQuery): Promise<User | null> {
    return this.repo.findUser(data);
  }

  async createLocalUser(data: RegisterLocalUserDto): Promise<User> {
    data.password = hashPassword(data.password);
    const newUser = new User(data, data.password);
    return this.repo.createLocalUser(newUser);
  }
}
