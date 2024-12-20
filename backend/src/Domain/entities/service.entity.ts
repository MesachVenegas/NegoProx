import { Date } from './date.entity';

export class Service {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public business_id: string,
    public createdAt: Date,
    public updatedAt: Date,

    public Dates?: Date[],
  ) {}
}
