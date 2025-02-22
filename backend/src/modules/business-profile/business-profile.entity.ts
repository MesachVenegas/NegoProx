import { Type } from 'class-transformer';
import { Business } from '../business/business.entity';

export class BusinessProfile {
  id: string;
  bannerImage?: string;
  website?: string;
  socialMedia?: object;
  createdAt: Date;
  updatedAt: Date;
  businessId: string;
  @Type(() => Business)
  business?: Business;

  /**
   * Updates the business profile with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   *                    - businessId
   *                    - createdAt
   */
  update(partial: Partial<BusinessProfile>) {
    delete partial.id;
    delete partial.businessId;
    delete partial.createdAt;

    Object.assign(this, partial);
  }
}
