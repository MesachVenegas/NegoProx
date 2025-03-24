import { Module } from '@nestjs/common';
import { CategoryController } from '../controllers/category.controller';
import { CategoryPrismaRepository } from '../repositories/category.repository';

@Module({
  providers: [CategoryPrismaRepository],
  controllers: [CategoryController],
  exports: [CategoryPrismaRepository],
})
export class CategoryModule {}
