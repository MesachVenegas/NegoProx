import { User } from './user.entity';

export class UserProfile {
  public id: string;
  public profilePicture: string;
  public bio: string;
  public address: string;
  public createdAt: Date;
  public updatedAt: Date;

  public user?: User;
  public userId?: string;

  update(partial: Partial<UserProfile>) {
    delete partial.id;
    delete partial.createdAt;
    delete partial.userId;

    Object.assign(this, partial);
  }
}
