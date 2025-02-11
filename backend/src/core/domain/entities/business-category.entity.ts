import { Business } from './business.entity';
import { Category } from './category.entity';

export class BussinesCategory {
  constructor(
    public readonly business: Business,
    public businessId: string,
    public readonly category: Category,
    public categoryId: string,
  ) {}
}
