import { User } from '../user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserProfileAccDto } from '../dto/user-profile-acc.dto';
import { QuerySearchUserDto } from '../dto/user-query-search.dto';
import { IPagination } from '@/shared/interfaces/pagination.interface';

export interface IUserRepository {
  getAllUsers(data: IPagination): Promise<User[]>;
  countUsers(): Promise<number>;
  findUser(query: QuerySearchUserDto): Promise<UserProfileAccDto | null>;
  createLocalUser(data: User): Promise<User>;
  update(user: UpdateUserDto, id: string): Promise<UserProfileAccDto>;
}
