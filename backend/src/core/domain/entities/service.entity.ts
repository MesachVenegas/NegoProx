import { Availability } from '@prisma/client';
import { Appointment } from './appointment.entity';
import { Business } from './business.entity';

export class Service {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public time: number,
    public business: Business,
    public business_id: string,
    public appointments: Appointment[],
    public availability: Availability[],
    public description?: string,
  ) {}
}
