import { Type } from 'class-transformer';
import { User } from '../user/user.entity';

export class UserProfile {
  public id: string;
  public profilePicture: string;
  public bio: string;
  public address: string;
  public createdAt: Date;
  public updatedAt: Date;
  @Type(() => User)
  public user?: User;
  public userId?: string;

  update(partial: Partial<UserProfile>) {
    delete partial.id;
    delete partial.createdAt;
    delete partial.userId;

    Object.assign(this, partial);
  }
}
