import { Type } from 'class-transformer';
import { Business } from '@/modules/business/business.entity';

export class Service {
  id: string;
  name: string;
  @Type(() => Number)
  price: number;
  description: string;
  time: number;
  businessId: string;
  @Type(() => Business)
  business?: Business;
}
