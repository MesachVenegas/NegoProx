import { Type } from 'class-transformer';
import { Business } from '@/modules/business/business.entity';

export class Service {
  id: string;
  name: string;
  @Type(() => Number)
  price: number;
  description: string;
  time: number;
  isDisabled: boolean;
  businessId: string;
  @Type(() => Business)
  business?: Business;

  update(partial: Partial<Service>) {
    Object.assign(this, partial);
  }
}
