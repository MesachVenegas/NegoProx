import { BussinesCategory } from './business-category.entity';

export class Category {
  constructor(
    public readonly id: string,
    public name: string,
    public businessCategory: BussinesCategory[],
  ) {}
}
