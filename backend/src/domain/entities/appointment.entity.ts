import { Work } from './work.entity';
import { User } from './user.entity';
import { Business } from './business.entity';
import { Service } from './business-service.entity';
import { Status } from '@/domain/constants/status.enum';

export class Appointment {
  public id: string;
  public datetime: Date;
  public state: Status;
  public clientId: string;
  public client?: User;
  public serviceId: string;
  public service?: Service;
  public businessId: string;
  public business?: Business;
  public work?: Work;
  public messages?: any[];

  /**
   * Updates the appointment with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   *                    - clientId
   *                    - serviceId
   *                    - businessId
   */
  update(partial: Partial<Appointment>) {
    delete partial.id;
    delete partial.clientId;
    delete partial.serviceId;
    delete partial.businessId;

    Object.assign(this, partial);
  }
}
