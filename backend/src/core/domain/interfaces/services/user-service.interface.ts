import { User } from '@/core/domain/entities';

export interface UserServiceInterface {
  register(user: User): Promise<User>;
  update(user: Partial<User>): Promise<User>;
  destroy(id: string): Promise<void>;
  searchById(id: string): Promise<User | null>;
  searchByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[] | null>;
  searchByQuery(query: string): Promise<User[] | null>;
}
