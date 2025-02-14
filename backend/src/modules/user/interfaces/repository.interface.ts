import { User } from '../user.entity';
import { FindQuery } from './common.interface';

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  findUser(query: FindQuery): Promise<User | null>;
  createLocalUser(data: User): Promise<User>;
}
