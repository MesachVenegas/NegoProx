import { User } from '../user.entity';
import { UserProfileAccDto } from '../dto/user-profile-acc.dto';
import { QuerySearchUserDto } from '../dto/user-query-search.dto';
import { IPagination } from '@/shared/common/interfaces/pagination.interface';

export interface IUserRepository {
  getAllUsers(data: IPagination): Promise<User[]>;
  findUser(query: QuerySearchUserDto): Promise<UserProfileAccDto | null>;
  createLocalUser(data: User): Promise<User>;
}
