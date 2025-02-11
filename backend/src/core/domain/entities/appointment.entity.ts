import { Message } from '@prisma/client';
import { Status } from '../enums/status.enum';
import { Business } from './business.entity';
import { Service } from './service.entity';
import { User } from './user.entity';
import { Work } from './work.entity';

export class Appointment {
  constructor(
    public readonly id: string,
    public datetime: Date = new Date(),
    public state: Status,
    public client: User,
    public clientId: string,
    public service: Service,
    public serviceId: string,
    public business: Business,
    public businessId: string,
    public messages: Message[],
    public work?: Work,
  ) {}
}
