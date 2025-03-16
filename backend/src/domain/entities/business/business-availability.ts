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

  constructor(params: {
    id?: string;
    dayOfWeek: number;
    startTime: Date;
    endTime: Date;
    businessId: string;
    serviceId?: string | null;
    business?: Business;
    service?: BusinessService;
  }) {
    this.id = params.id;
    this.dayOfWeek = params.dayOfWeek;
    this.startTime = params.startTime;
    this.endTime = params.endTime;
    this.businessId = params.businessId;
    this.serviceId = params.serviceId ?? null;
    this.business = params.business;
    this.service = params.service;
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
