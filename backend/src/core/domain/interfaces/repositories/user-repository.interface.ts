import { User } from '@/core/domain/entities';

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  update(user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[] | null>;
  findByQuery(query: string): Promise<User[] | null>;
}
