import { Business } from '@/modules/business/business.entity';

export class Service {
  public id: string;
  public name: string;
  public price: number;
  public description: string;
  public time: number;
  public isDisabled: boolean;
  public businessId: string;
  public business?: Business;

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
