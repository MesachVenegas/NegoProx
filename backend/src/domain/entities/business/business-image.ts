import { Business } from './business';

export class BusinessImage {
  public id: string;
  public imageUrl: string;
  public order: number;
  public businessId: string;
  public business?: Business;

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
