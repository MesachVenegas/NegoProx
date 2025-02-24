import { Business } from './business.entity';

export class BusinessProfile {
  public id: string;
  public bannerImage?: string;
  public website?: string;
  public socialMedia?: object;
  public createdAt: Date;
  public updatedAt: Date;
  public businessId: string;
  public business?: Business;

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
