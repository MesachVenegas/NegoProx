import { UserEntity } from '../entities/user.entity';

export interface IUserRepositoryInterface {
  authenticate(email: string, password: string): Promise<UserEntity>;
  create(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
}
