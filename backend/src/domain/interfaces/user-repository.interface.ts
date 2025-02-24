import { User } from '../entities';
import { IPagination } from '@/shared/interfaces/pagination.interface';
import { UpdateUserDto } from '@/infrastructure/dto/user/update-user.dto';
import { QuerySearchUserDto } from '@/infrastructure/dto/user/user-query-search.dto';

export interface IUserRepository {
  getAllUsers(data: IPagination): Promise<User[]>;
  countUsers(): Promise<number>;
  findUser(query: QuerySearchUserDto): Promise<User | null>;
  saveLocalUser(data: User): Promise<User>;
  updateUser(user: UpdateUserDto, id: string): Promise<User>;
}
