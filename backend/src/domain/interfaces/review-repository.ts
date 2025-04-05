import { Review } from '../entities';

export interface ReviewRepository {
  countReviews(id: string): Promise<number>;
  getReviews(
    id: string,
    sortBy: string,
    limit: number,
    skip: number,
    order: 'asc' | 'desc',
  ): Promise<Review[]>;
  getAverageRate(id: string): Promise<number>;
}
