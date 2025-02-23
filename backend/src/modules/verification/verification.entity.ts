import { User } from '../user/user.entity';

export class Verification {
  public id: string;
  public token: string;
  public tokenExp: Date;
  public used: boolean;

  public userId: string;
  public user?: User;

  update(partial: Partial<Verification>) {
    delete partial.id;
    delete partial.userId;

    Object.assign(this, partial);
  }
}
