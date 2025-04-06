import { Module } from '@nestjs/common';
import { ReviewsController } from '../controllers/reviews.controller';
import { ReviewPrismaRepository } from '../repositories/review.repository';

@Module({
  providers: [ReviewPrismaRepository],
  controllers: [ReviewsController],
  exports: [ReviewPrismaRepository],
})
export class ReviewsModule {}
