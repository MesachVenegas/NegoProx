import { Business } from '../entities';
import { Role } from '../constants/role.enum';
import { IPagination } from '@/shared/interfaces/pagination.interface';

export interface BusinessRepository {
  countBusiness(): Promise<number>;
  searchBusiness(
    skip: number,
    limit: number,
    order: 'asc' | 'desc',
    name?: string,
    category?: string,
  ): Promise<Business[] | null>;
  findBusinessById(
    id: string,
  ): Promise<{ business: Business; rate: number } | null>;
  findBusinessByOwnerId(id: string): Promise<Business | null>;
  getAllBusiness(data: Partial<IPagination>): Promise<Business[] | null>;
  saveLocalBusiness(entity: Business): Promise<Business>;
  promoteBusinessOwner(
    entity: Business,
    userId: string,
    role: Role,
  ): Promise<Business | null>;
  updateBusiness(business: Business, businessId: string): Promise<Business>;
  deleteBusiness(businessId: string): Promise<Business | null>;
  checkExistBusiness(name: string, userId: string): Promise<boolean>;
}
