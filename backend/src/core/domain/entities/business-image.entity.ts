import { Business } from './business.entity';

export class BusinessImage {
  constructor(
    public readonly id: string,
    public imageUrl: string,
    public order: number,
    public business: Business,
    public businessId: string,
  ) {}
}
