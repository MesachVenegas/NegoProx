import { Business } from './business';
import { BusinessService } from './business-service';

export class Availability {
  public id: string | undefined;
  public dayOfWeek: number;
  public startTime: Date;
  public endTime: Date;
  public businessId: string;
  public serviceId: string | null;

  public business?: Business;
  public service?: BusinessService;

  constructor(init: {
    id?: string;
    dayOfWeek: number;
    endTime: Date;
    startTime: Date;
    businessId: string;
    serviceId?: string | null;

    business?: Business;
    service?: BusinessService;
  }) {
    this.id = init.id;
    this.dayOfWeek = init.dayOfWeek;
    this.startTime = init.startTime;
    this.endTime = init.endTime;
    this.businessId = init.businessId;
    this.serviceId = init.serviceId ?? null;
    this.business = init.business;
    this.service = init.service;
  }

  /**
   * Updates the availability with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   *                    - businessId
   *                    - serviceId
   */
  update(
    partial: Partial<Omit<Availability, 'id' | 'businessId' | 'serviceId'>>,
  ) {
    Object.assign(this, partial);
  }
}
