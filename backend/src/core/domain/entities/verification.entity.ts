import { User } from './user.entity';

export class Verification {
  constructor(
    public readonly id: string,
    public token: string,
    public tokenExp: Date,
    public used: boolean,
    public user: User,
    public userId: string,
  ) {}
}
