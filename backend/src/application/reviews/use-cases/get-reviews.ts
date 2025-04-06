import { ReviewRepository } from '@/domain/interfaces/review-repository';
import { ResReviewsDto } from '@/infrastructure/dto/review/res-reviews.dto';
import { plainToInstance } from 'class-transformer';

interface Props {
  id: string;
  page?: number;
  limit?: number;
  orderBy?: 'desc' | 'asc';
  sortBy?: 'reviewedAt' | 'rate';
}

export class GetReviewsUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute({
    id,
    page = 1,
    limit = 5,
    orderBy = 'asc',
    sortBy = 'reviewedAt',
  }: Props) {
    const skip = (page - 1) * limit;
    const [reviews, count] = await Promise.all([
      this.reviewRepository.getReviews(id, sortBy, limit, skip, orderBy),
      this.reviewRepository.countReviews(id),
    ]);

    return {
      pages: count ? Math.ceil(count / limit) : 1,
      prev: page > 1 ? page - 1 : null,
      next: page * limit < count ? page + 1 : null,
      limit,
      data: plainToInstance(ResReviewsDto, reviews),
    };
  }
}
