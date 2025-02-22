import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';

import { User } from '../user/user.entity';
import { Work } from '../work/work.entity';
import { Business } from '../business/business.entity';
import { Status } from '@/shared/constants/status.enum';
import { Service } from '../business-services/business-service.entity';

export class Appointment {
  id: string;

  datetime: Date;

  @IsEnum(Status)
  state: Status;

  clientId: string;

  @Type(() => User)
  client?: User;

  serviceId: string;

  @Type(() => Service)
  service?: Service;

  businessId: string;

  @Type(() => Business)
  business?: Business;

  @Type(() => Work)
  work?: Work;

  messages?: any[];

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
