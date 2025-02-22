import { Type } from 'class-transformer';
import { Business } from '../business/business.entity';
import { User } from '../user/user.entity';
import { Work } from '../work/work.entity';

export class Payment {
  id: string;
  amount: number;
  status: string;
  paymentMethod: string;
  transactionId?: string;
  timestamp: Date;
  workId: string;
  @Type(() => Work)
  work?: Work;
  clientId: string;
  @Type(() => User)
  client?: User;
  businessId: string;
  @Type(() => Business)
  business?: Business;

  /**
   * Updates the payment with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   *                    - workId
   *                    - clientId
   *                    - businessId
   */
  update(partial: Partial<Payment>) {
    delete partial.id;
    delete partial.workId;
    delete partial.clientId;
    delete partial.businessId;

    Object.assign(this, partial);
  }
}
