import { User } from '../entities/user';

export interface AccountRepository {
  findAccount(provider: string, providerId: string): Promise<User | null>;
}
