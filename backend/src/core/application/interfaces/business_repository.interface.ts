import { Business } from '@/core/domain/entities';

export interface BusinessRepositoryInterface {
  create(business: Business): Promise<Business>;
  update(business: Partial<Business>): Promise<Business>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Business[] | null>;
  findAll(): Promise<Business[] | null>;
  findByQuery(query: string): Promise<Business[] | null>;
}
