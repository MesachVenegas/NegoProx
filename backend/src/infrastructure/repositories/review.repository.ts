import { PrismaService } from '../orm/prisma.service';

export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async countReviews(id: string): Promise<number> {
    return this.prisma.review.count({
      where: {
        businessId: id,
      },
    });
  }

  async getReviews(id: string): Promise<any[]> {
    return this.prisma.review.findMany({
      where: {
        businessId: id,
      },
    });
  }

  async getAverageRate(id: string): Promise<number> {
    const result = await this.prisma.review.aggregate({
      where: { businessId: id },
      _avg: { rate: true },
    });

    return result._avg.rate || 0;
  }
}
