import { User } from './user.entity';

export class Account {
  constructor(
    public readonly id: string,
    public provider: string,
    public providerId: string,
    public passwordHash: string,
    public createdAt: Date,
    public updatedAt: Date,
    public user: User,
    public userId: string,
  ) {}
}
