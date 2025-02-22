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

  /**
   * Updates the service with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   *                    - businessId
   */
  update(partial: Partial<Service>) {
    delete partial.id;
    delete partial.businessId;

    Object.assign(this, partial);
  }
}
