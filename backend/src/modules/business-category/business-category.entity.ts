import { Type } from 'class-transformer';
import { Business } from '../business/business.entity';
import { Category } from '../category/category.entity';

export class BusinessCategory {
  businessId: string;

  @Type(() => Business)
  business?: Business[];

  categoryId: string;

  @Type(() => Category)
  category?: Category[];
}
