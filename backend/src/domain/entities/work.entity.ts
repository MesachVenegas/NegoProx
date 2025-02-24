import { User } from './user.entity';
import { Review } from './review.entity';
import { Payment } from './payment.entity';
import { Business } from './business.entity';
import { Appointment } from './appointment.entity';
import { Status } from '@/domain/constants/status.enum';

export class Work {
  public id: string;
  public description: string;
  public status: Status;
  public initDate: Date;
  public endDate: Date;

  public clientId: string;
  public client: User;
  public businessId: string;
  public business: Business;
  public appointmentId?: string;
  public appointment?: Appointment;
  public payment?: Payment;
  public review?: Review;
  public message?: any[];

  /**
   * Updates the work with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   *                    - clientId
   *                    - businessId
   *                    - appointmentId
   */
  update(partial: Partial<Work>) {
    delete partial.id;
    delete partial.clientId;
    delete partial.businessId;
    delete partial.appointmentId;

    Object.assign(this, partial);
  }
}
