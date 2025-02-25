import { Category } from '../category';
import { Business } from './business';

export class BusinessCategory {
  public businessId: string;
  public business?: Business[];
  public categoryId: string;
  public category?: Category[];
}
