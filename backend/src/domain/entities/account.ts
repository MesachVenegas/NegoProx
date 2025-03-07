import { User } from './user/user';

export class Account {
  public id: string | undefined;
  public provider: string;
  public providerId: string;
  public userId?: string;
  public user?: User;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(data: {
    id?: string;
    provider: string;
    providerId: string | null;
    userId?: string;
    user?: User;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.provider = data.provider;
    this.providerId = data.providerId || '';
    this.userId = data.userId;
    this.user = data.user;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  update(partial: Partial<Account>) {
    delete partial.id;
    delete partial.userId;
    delete partial.createdAt;
    delete partial.updatedAt;

    Object.assign(this, partial);
  }
}
