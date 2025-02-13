import { User } from '../user/user.entity';

export class Account {
  public id: string;
  public provider: string;
  public providerId: string | null;
  public userId?: string | null;
  public user?: User | null;
  public createdAt: Date;
  public updatedAt: Date;
  constructor(partial: Partial<Account>) {
    this.id = partial.id ?? '';
    this.provider = partial.provider ?? '';
    this.providerId = partial.providerId || '';
    this.userId = partial.userId ?? null;
    this.user = partial.user ?? null;
    this.createdAt = partial.createdAt ?? new Date();
    this.updatedAt = partial.updatedAt ?? new Date();
  }
}
