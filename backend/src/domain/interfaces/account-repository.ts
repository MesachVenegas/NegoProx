import { User } from '../entities';

export interface AccountRepository {
  findAccount(provider: string, providerId: string): Promise<User | null>;
}
