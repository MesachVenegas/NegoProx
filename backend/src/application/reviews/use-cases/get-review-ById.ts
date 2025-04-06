import { ReviewRepository } from '@/domain/interfaces/review-repository';
import { ResReviewsDto } from '@/infrastructure/dto/review/res-reviews.dto';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export class GetReviewByIdUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(id: string) {
    const review = await this.reviewRepository.getReviewById(id);

    if (!review) throw new NotFoundException(`Review with id ${id} not found`);

    return plainToInstance(ResReviewsDto, review);
  }
}
