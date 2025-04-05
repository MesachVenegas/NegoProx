import { Injectable } from '@nestjs/common';
import { Review } from '@/domain/entities';
import { PrismaService } from '../orm/prisma.service';
import { ReviewRepository } from '@/domain/interfaces/review-repository';

@Injectable()
export class ReviewPrismaRepository implements ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the total count of reviews for the given business ID.
   *
   * @param id - The unique identifier of the business to retrieve the review count for.
   * @returns A promise that resolves with the total count of reviews.
   */
  async countReviews(id: string): Promise<number> {
    return this.prisma.review.count({
      where: {
        businessId: id,
      },
    });
  }

  /**
   * Retrieves a list of reviews for a specific business, ordered by the specified criteria.
   *
   * @param id - The unique identifier of the business to retrieve reviews for.
   * @param sortBy - The field by which to sort the reviews, in descending order.
   * @param limit - The maximum number of reviews to retrieve.
   * @param skip - The number of reviews to skip, for pagination purposes.
   * @returns A promise that resolves with an array of Review objects.
   */
  async getReviews(
    id: string,
    sortBy: string,
    limit: number,
    skip: number,
    orderBy: 'desc' | 'asc',
  ): Promise<Review[]> {
    const result = await this.prisma.review.findMany({
      where: {
        businessId: id,
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: orderBy,
      },
    });

    return result.map((review) => new Review(review));
  }

  /**
   * Retrieves the average rating of a business.
   *
   * @param id - The unique identifier of the business to retrieve the average rating for.
   * @returns A promise that resolves with the average rating of the business, or 0 if no reviews are found.
   */
  async getAverageRate(id: string): Promise<number> {
    const result = await this.prisma.review.aggregate({
      where: { businessId: id },
      _avg: { rate: true },
    });

    return result._avg.rate || 0;
  }
}
