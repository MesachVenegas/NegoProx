import { User } from './user.entity';

export class TokenVersion {
  constructor(
    public readonly id: string,
    public version: number,
    public updatedAt: Date,
    public user: User,
    public userId: string,
  ) {}
}
