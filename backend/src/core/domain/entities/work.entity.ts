import { Status } from '../enums';
import { Business } from './business.entity';
import { Message } from './message.entity';
import { Payment } from './payment.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

export class Work {
  constructor(
    public readonly id: string,
    public status: Status,
    public initDate: Date,
    public client: User,
    public clientId: string,
    public business: Business,
    public businessId: string,
    public description?: string,
    public endDate?: Date,
    public appointmentId?: string,
    public payment?: Payment,
    public review?: Review,
    public message?: Message[],
  ) {}
}
