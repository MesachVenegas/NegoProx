import { User } from '../user/user.entity';

export class UserProfile {
  public id: string;
  public profilePicture: string | null;
  public bio: string | null;
  public address: string | null;
  public createdAt: Date;
  public updatedAt: Date;
  public user?: User;
  public userId?: string;

  constructor(partial: Partial<UserProfile>) {
    this.id = partial.id ?? '';
    this.profilePicture = partial.profilePicture ?? null;
    this.bio = partial.bio ?? null;
    this.address = partial.address ?? null;
    this.createdAt = partial.createdAt ?? new Date();
    this.updatedAt = partial.updatedAt ?? new Date();
    this.user = partial.user ?? undefined;
    this.userId = partial.userId ?? '';
  }
}
