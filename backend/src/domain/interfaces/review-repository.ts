import { Review } from '../entities';

export interface ReviewRepository {
  countReviews(id: string): Promise<number>;
  getReviewById(id: string): Promise<Review | null>;
  getReviews(
    id: string,
    sortBy: string,
    limit: number,
    skip: number,
    order: 'asc' | 'desc',
  ): Promise<Review[]>;
  getAverageRate(id: string): Promise<number>;
  createReview(review: Review): Promise<Review>;
  updateReview(review: Review): Promise<Review>;
  deleteReview(id: string): Promise<Review>;
}
