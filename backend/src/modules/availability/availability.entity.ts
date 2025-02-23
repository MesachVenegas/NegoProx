import { Business } from '../business/business.entity';
import { Service } from '../business-services/business-service.entity';

export class Availability {
  public id: string;
  public dayOfWeek: string[];
  public startTime: string;
  public endTime: Date;
  public businessId: Date;
  public business?: Business;
  public serviceId: string;
  public service?: Service;

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
