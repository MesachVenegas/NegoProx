import { Type } from 'class-transformer';
import { User } from '../user/user.entity';

export class Verification {
  id: string;
  token: string;
  tokenExp: Date;
  used: boolean;
  userId: string;

  @Type(() => User)
  user?: User;

  update(partial: Partial<Verification>) {
    delete partial.id;
    delete partial.userId;

    Object.assign(this, partial);
  }
}
