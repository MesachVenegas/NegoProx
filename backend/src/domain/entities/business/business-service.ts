import { Business } from './business';

export class BusinessService {
  public id: string | undefined;
  public name: string;
  public price: number;
  public description?: string;
  public time: number;
  public isDisabled: boolean;
  public businessId?: string;
  public business?: Business;

  constructor(params: {
    id?: string;
    name: string;
    price: number;
    description?: string | null;
    time: number;
    isDisabled?: boolean;
    businessId?: string;
    business?: Business;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.price = params.price;
    this.description = params.description ?? '';
    this.time = params.time;
    this.isDisabled = params.isDisabled ?? false;
    this.businessId = params.businessId;
    this.business = params.business;
  }

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
