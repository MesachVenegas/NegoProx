import { ReviewRepository } from '@/domain/interfaces/review-repository';

export class GetCountReviewsUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(id: string) {
    const result = await this.reviewRepository.countReviews(id);

    return result;
  }
}
