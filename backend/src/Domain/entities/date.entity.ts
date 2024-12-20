import { Work } from './work.entity';
import { Message } from './message.entity';
import { StatusType } from '@domain/enums/status.enum';

export class Date {
  constructor(
    public id: string,
    public date: Date,
    public status: StatusType,
    public client_id: string,
    public service_id: string,
    public business_id: string,
    public cancel_at: Date | null,
    public createdAt: Date,
    public updatedAt: Date,

    public works?: Work[],
    public messages?: Message[],
  ) {}
}
