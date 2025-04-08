import { Injectable } from '@nestjs/common';
import { Review } from '@/domain/entities';
import { PrismaService } from '../orm/prisma.service';
import { ReviewRepository } from '@/domain/interfaces/review-repository';
import { User, UserProfile } from '@/domain/entities/user';
import { Role } from '@/domain/constants/role.enum';

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
   * Retrieves a review by its ID from the database.
   *
   * @param id - The unique identifier of the review to retrieve.
   * @returns A promise that resolves with the Review object, or null if no review with the given ID is found.
   */
  async getReviewById(id: string): Promise<Review | null> {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!review) return null;

    return new Review(review);
  }

  /**
   * Retrieves a paginated list of reviews for the given business ID, sorted
   * by the given column in the given order.
   *
   * @param id - The unique identifier of the business to retrieve the reviews for.
   * @param sortBy - The column to sort the reviews by.
   * @param limit - The maximum number of reviews to retrieve.
   * @param skip - The number of reviews to skip, for pagination.
   * @param orderBy - The order in which to sort the reviews, either 'asc' or 'desc'.
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
      include: {
        client: {
          include: {
            userProfile: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: orderBy,
      },
    });

    return result.map(
      (review) =>
        new Review({
          ...review,
          client: new User({
            ...review.client,
            userType: review.client.userType as Role,
            userProfile: review.client.userProfile as UserProfile,
          }),
        }),
    );
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

  /**
   * Creates a new review for the given business and client.
   *
   * @param review - The review to create, without an ID.
   * @returns A promise that resolves with the newly created Review object.
   */
  async createReview(review: Omit<Review, 'id'>) {
    const newReview = await this.prisma.review.create({
      data: {
        rate: review.rate,
        comment: review.comment,
        businessId: review.businessId,
        clientId: review.clientId,
        workId: review.workId,
      },
    });

    return new Review(newReview);
  }

  /**
   * Updates an existing review in the database.
   *
   * @param review - The Review object containing the updated data. The review must include its unique identifier.
   * @returns A promise that resolves when the review is successfully updated.
   */
  async updateReview(review: Review): Promise<Review> {
    const result = await this.prisma.review.update({
      where: {
        id: review.id,
      },
      data: {
        rate: review.rate,
        comment: review.comment,
      },
    });

    return new Review(result);
  }

  /**
   * Deletes a review by its ID from the database.
   *
   * @param id - The unique identifier of the review to delete.
   * @returns A promise that resolves when the review is successfully deleted.
   */
  async deleteReview(id: string): Promise<Review> {
    const deleted = await this.prisma.review.delete({
      where: {
        id,
      },
    });

    return new Review(deleted);
  }
}
