import { User } from '../../../core/entities/user.entity';

export interface UserRepositoryInterface {
  create(user: User): Promise<User>;
  findUserByEmail(email?: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
}
