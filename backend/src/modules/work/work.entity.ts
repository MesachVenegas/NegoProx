import { Type } from 'class-transformer';

import { User } from '../user/user.entity';
import { Review } from '../review/review.entity';
import { Payment } from '../payment/payment.entity';
import { Business } from '../business/business.entity';
import { Status } from '@/shared/constants/status.enum';
import { Appointment } from '../appointment/appointment.entity';

export class Work {
  id: string;
  description: string;
  status: Status;
  initDate: Date;
  endDate: Date;
  clientId: string;
  @Type(() => User)
  client: User;
  businessId: string;
  @Type(() => Business)
  business: Business;
  appointmentId?: string;
  @Type(() => Appointment)
  appointment?: Appointment;
  @Type(() => Payment)
  payment?: Payment;
  @Type(() => Review)
  review?: Review;
  message?: any[];

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
