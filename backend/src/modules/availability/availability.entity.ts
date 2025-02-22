import { Type } from 'class-transformer';
import { Service } from '../business-services/business-service.entity';
import { Business } from '../business/business.entity';

export class Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: Date;
  businessId: Date;
  @Type(() => Business)
  business?: Business;
  serviceId: string;
  @Type(() => Service)
  service?: Service;

  /**
   * Updates the availability with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   *                    - businessId
   *                    - serviceId
   */
  update(partial: Partial<Availability>) {
    delete partial.id;
    delete partial.businessId;
    delete partial.serviceId;

    Object.assign(this, partial);
  }
}
