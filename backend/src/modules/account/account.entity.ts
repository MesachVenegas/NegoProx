import { Type } from 'class-transformer';
import { User } from '../user/user.entity';

export class Account {
  public id: string;
  public provider: string;
  public providerId: string;
  public userId?: string;
  @Type(() => User)
  public user?: User;
  public createdAt: Date;
  public updatedAt: Date;

  update(partial: Partial<Account>) {
    delete partial.id;
    delete partial.userId;
    delete partial.createdAt;
    delete partial.updatedAt;

    Object.assign(this, partial);
  }
}
