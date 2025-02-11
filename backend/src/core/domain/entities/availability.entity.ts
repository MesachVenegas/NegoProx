import { Business } from './business.entity';
import { Service } from './service.entity';

export class Availability {
  constructor(
    public readonly id: string,
    public dayOfWeek: number,
    public startTime: Date,
    public endTime: Date,
    public business: Business,
    public businessId: string,
    public service: Service,
    public serviceId: string,
  ) {}
}
