import { User } from '../entities/user';

export interface UserRepository {
  countUsers(): Promise<number>;
  getAllUsers(
    skip: number,
    limit: number,
    order: 'asc' | 'desc',
  ): Promise<User[] | null>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  searchUserByQuery(
    id?: string,
    email?: string,
    phone?: string,
  ): Promise<User | null>;
  saveLocalUser(data: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  updatePassword(password: string, id: string): Promise<User>;
  disableAccount(id: string): Promise<User>;
  logicDeleteAccount(id: string): Promise<User>;
}
