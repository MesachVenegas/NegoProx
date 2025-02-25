import { Business } from './business';

export class BusinessService {
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
  update(partial: Partial<BusinessService>) {
    delete partial.id;
    delete partial.businessId;

    Object.assign(this, partial);
  }
}
