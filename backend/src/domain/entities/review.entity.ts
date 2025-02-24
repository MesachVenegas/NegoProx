import { User } from './user.entity';
import { Work } from './work.entity';
import { Business } from './business.entity';

export class Review {
  public id: string;
  public rate: number;
  public comment?: string;
  public reviewedAt: Date;
  public workId: string;
  public work?: Work;
  public clientId: string;
  public client?: User;
  public businessId: string;
  public business?: Business;

  /**
   * Updates the review with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   *                    - workId
   *                    - clientId
   *                    - businessId
   */
  update(partial: Partial<Review>) {
    delete partial.id;
    delete partial.workId;
    delete partial.clientId;
    delete partial.businessId;

    Object.assign(this, partial);
  }
}
