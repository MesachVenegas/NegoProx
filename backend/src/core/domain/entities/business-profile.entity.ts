import { Business } from './business.entity';

export class BusinessProfile {
  constructor(
    public readonly id: string,
    public business: Business,
    public businessId: string,
    public bannerImage?: string,
    public website?: string,
    public socialMedia?: object,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
