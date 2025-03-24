import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CategoryDto } from '../dto/category.dto';
import { CategoryRepository } from '@/domain/interfaces/category-repository';

export class GetACategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string) {
    const category = await this.categoryRepository.getCategoryById(id);

    if (!category) {
      throw new NotFoundException('Category not found or not exist');
    }

    return plainToInstance(CategoryDto, category);
  }
}
