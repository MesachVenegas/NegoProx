import { Business } from './business.entity';
import { Category } from './category.entity';

export class BusinessCategory {
  public businessId: string;
  public business?: Business[];
  public categoryId: string;
  public category?: Category[];
}
