import { Type } from 'class-transformer';
import { BusinessCategory } from '../business-category/business-category.entity';

export class Category {
  id: string;
  name: string;

  @Type(() => BusinessCategory)
  businessCategories?: BusinessCategory[];

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
