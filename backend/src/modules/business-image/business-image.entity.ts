import { Type } from 'class-transformer';
import { Business } from '../business/business.entity';

export class BusinessImage {
  id: string;
  imageUrl: string;
  order: number;
  businessId: string;
  @Type(() => Business)
  business?: Business;

  /**
   * Updates the business image with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   *                    - businessId
   */
  update(partial: Partial<BusinessImage>) {
    delete partial.id;
    delete partial.businessId;

    Object.assign(this, partial);
  }
}
