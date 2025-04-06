import { Review } from '@/domain/entities';
import { ReviewRepository } from '@/domain/interfaces/review-repository';
import { CreateReviewDto } from '@/infrastructure/dto/review/create-review.dto';
import { ResReviewsDto } from '@/infrastructure/dto/review/res-reviews.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export class CreateReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(data: CreateReviewDto) {
    const review = new Review(data);
    const result = await this.reviewRepository.createReview(review);

    if (!result) throw new InternalServerErrorException('Error saving review');

    return plainToInstance(ResReviewsDto, result);
  }
}
