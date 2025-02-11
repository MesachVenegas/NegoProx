import { Status } from '../enums';
import { Business } from './business.entity';
import { User } from './user.entity';
import { Work } from './work.entity';

export class Payment {
  constructor(
    public readonly id: string,
    public amount: number,
    public status: Status,
    public paymentMethod: string,
    public timestamp: Date,
    public work: Work,
    public workId: string,
    public client: User,
    public clientId: string,
    public business: Business,
    public businessId: string,
    public transactionId?: string,
  ) {}
}
