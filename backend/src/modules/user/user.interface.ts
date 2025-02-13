import { User } from './user.entity';

export interface UpdateProfile {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface FindQuery {
  id?: string;
  email?: string;
  phone?: string;
}

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  findUser(query: FindQuery): Promise<User | null>;
  createLocalUser(data: User): Promise<User>;
}
