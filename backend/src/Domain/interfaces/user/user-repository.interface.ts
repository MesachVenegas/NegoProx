import { User } from '@domain/entities';

export interface UserRepositoryInterface {
  create(user: User): Promise<User>;
  findUserByEmail(email?: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  markEmailAsConfirmed(id: string): Promise<void>;
  resetPassword(id: string, password: string): Promise<void>;
}
