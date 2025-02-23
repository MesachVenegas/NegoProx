import { Business } from '../business/business.entity';
import { Category } from '../category/category.entity';

export class BusinessCategory {
  public businessId: string;
  public business?: Business[];
  public categoryId: string;
  public category?: Category[];
}
