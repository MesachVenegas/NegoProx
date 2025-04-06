import { ReviewRepository } from '@/domain/interfaces/review-repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class DeleteReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(id: string, userId: string) {
    const exist = await this.reviewRepository.getReviewById(id);
    if (!exist) throw new NotFoundException('Review not found or not exist');
    if (exist.clientId !== userId)
      throw new ForbiddenException("You don't have permissions");

    const deleted = await this.reviewRepository.deleteReview(id);

    return deleted;
  }
}
