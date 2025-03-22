import { BusinessCategory } from './business';

export class Category {
  public id: string;
  public name: string;
  public en_name: string;
  public businessCategories?: BusinessCategory[];

  /**
   * Updates the category with the provided data.
   *
   * @param partial - A partial object containing the updated data. The following
   *                  properties are not allowed and will be deleted if present:
   *                    - id
   */
  update(partial: Partial<Category>) {
    delete partial.id;

    Object.assign(this, partial);
  }
}
