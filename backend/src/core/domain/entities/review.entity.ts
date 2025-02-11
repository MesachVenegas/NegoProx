import { User } from './user.entity';
import { Work } from './work.entity';
import { Business } from './business.entity';

export class Review {
  constructor(
    public readonly id: string,
    public rate: number,
    public commnet: string,
    public reviewdAt: Date,
    public work: Work,
    public workId: string,
    public client: User,
    public clientId: string,
    public business: Business,
    public businessId: string,
  ) {}
}
