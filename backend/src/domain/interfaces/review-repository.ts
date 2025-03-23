import { Review } from '../entities';

export interface ReviewRepository {
  countReviews(id: string): Promise<number>;
  getReviews(id: string): Promise<Review[]>;
  getAverageRate(id: string): Promise<number>;
}
