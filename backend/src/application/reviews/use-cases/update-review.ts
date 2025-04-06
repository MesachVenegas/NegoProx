import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewRepository } from '@/domain/interfaces/review-repository';
import { ResReviewsDto } from '@/infrastructure/dto/review/res-reviews.dto';

export class UpdateReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(data: UpdateReviewDto, id: string, userId: string) {
    const exist = await this.reviewRepository.getReviewById(id);
    if (!exist) throw new NotFoundException('Review not found or not exist');
    if (exist.clientId !== userId)
      throw new NotFoundException("You don't have permissions");

    exist.update({
      ...data,
      reviewedAt: new Date(),
    });

    const result = await this.reviewRepository.updateReview(exist);

    return plainToInstance(ResReviewsDto, result);
  }
}
