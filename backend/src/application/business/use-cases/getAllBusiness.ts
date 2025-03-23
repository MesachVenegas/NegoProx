import { BusinessRepository } from '@/domain/interfaces/business-repository';
import { ReviewRepository } from '@/domain/interfaces/review-repository';

export class GetAllBusinessUseCase {
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly ReviewRepository: ReviewRepository,
  ) {}

  async execute(skip: number, limit: number) {
    const businesses = await this.businessRepository.getAllBusiness({
      skip,
      limit,
    });

    return businesses;
  }
}
