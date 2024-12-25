import { Review } from './review.entity';
import { StatusType } from '@domain/enums';
import { Message } from './message.entity';

export class Work {
  constructor(
    public id: string,
    public description: string,
    public status: StatusType,
    public client_id: string,
    public business_id: string,
    public date_id: string,
    public closedAt: Date | null,
    public completedAt: Date | null,

    public reviews?: Review[],
    public messages?: Message[],
  ) {}
}
