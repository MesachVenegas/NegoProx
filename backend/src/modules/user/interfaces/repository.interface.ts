import { IPagination } from '@/shared/common/interfaces/pagination.interface';
import { QuerySearchUserDto } from '../dto/user-query-search.dto';
import { User } from '../user.entity';

export interface IUserRepository {
  getAllUsers(data: IPagination): Promise<User[]>;
  findUser(query: QuerySearchUserDto): Promise<User | null>;
  createLocalUser(data: User): Promise<User>;
}
