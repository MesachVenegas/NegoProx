import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RoleGuard } from '@/shared/guards/role.guard';
import { Public } from '@/shared/decorators/public.decorator';
import { ReviewPrismaRepository } from '../repositories/review.repository';
import { GetReviewsUseCase } from '@/application/reviews/use-cases/get-reviews';
import { GetReviewByIdUseCase } from '@/application/reviews/use-cases/get-review-ById';
import { CreateReviewDto } from '../dto/review/create-review.dto';
import { CreateReviewUseCase } from '@/application/reviews/use-cases/create-review';
import { Roles } from '@/shared/decorators/role.decorator';
import { Role } from '@/domain/constants/role.enum';
import { UpdateReviewUseCase } from '@/application/reviews/use-cases/update-review';
import { UpdateReviewDto } from '@/application/reviews/dto/update-review.dto';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { UserProfileAccDto } from '../dto/user';
import { DeleteReviewUseCase } from '@/application/reviews/use-cases/delete-review';

@Controller('reviews')
@UseGuards(JwtGuard, RoleGuard)
export class ReviewsController {
  constructor(
    private readonly reviewsPrismaRepository: ReviewPrismaRepository,
  ) {}
  @Get('/:businessId')
  @Public()
  async getReviews(
    @Param('businessId') businessId: string,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('sortBy') sortBy?: 'reviewedAt' | 'rate',
    @Query('orderBy') orderBy?: 'desc' | 'asc',
  ) {
    const useCase = new GetReviewsUseCase(this.reviewsPrismaRepository);
    const result = await useCase.execute({
      id: businessId,
      limit,
      page,
      sortBy,
      orderBy,
    });

    return result;
  }

  @Get('/get/:id')
  async getReviewById(@Param('id') id: string) {
    if (!id) throw new BadRequestException('No id provided');
    const useCase = new GetReviewByIdUseCase(this.reviewsPrismaRepository);
    const result = await useCase.execute(id);

    return result;
  }

  @Post('create/:businessId')
  @Roles(Role.USER, Role.BUSINESS)
  async createReview(
    @Param('businessId') businessId: string,
    @Body() data: CreateReviewDto,
  ) {
    const useCase = new CreateReviewUseCase(this.reviewsPrismaRepository);
    const result = await useCase.execute(data);

    return result;
  }

  @Put('update/:id')
  @Roles(Role.USER, Role.BUSINESS)
  async updateReview(
    @Param('id') id: string,
    @Body() data: UpdateReviewDto,
    @CurrentUser() user: UserProfileAccDto,
  ) {
    const useCase = new UpdateReviewUseCase(this.reviewsPrismaRepository);
    const result = await useCase.execute(data, id, user.id);

    if (!result)
      throw new InternalServerErrorException('Error updating review');

    return result;
  }

  @Delete('delete/:id')
  async deleteReview(
    @CurrentUser() user: UserProfileAccDto,
    @Param('id') id: string,
  ) {
    const useCase = new DeleteReviewUseCase(this.reviewsPrismaRepository);
    const result = await useCase.execute(id, user.id);

    if (!result)
      throw new InternalServerErrorException('Error deleting review');

    return result;
  }
}
