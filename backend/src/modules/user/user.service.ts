import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { FindQuery } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async loadAllUsers(): Promise<User[]> {
    return this.repo.getAllUsers();
  }

  async findUserByQuery(data: FindQuery): Promise<User | null> {
    return this.repo.findUser(data);
  }
}
