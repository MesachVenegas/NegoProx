import { User } from './user.entity';

export class UserProfile {
  constructor(
    public readonly id: string,
    public createdAt: Date,
    public updatedAt: Date,
    public user: User,
    public userId: string,
    public profilePicture?: string,
    public bio?: string,
    public address?: string,
  ) {}
}
