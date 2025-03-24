import { CategoryRepository } from '@/domain/interfaces/category-repository';
import { NotFoundException } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';
import { plainToInstance } from 'class-transformer';

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string) {
    const category = await this.categoryRepository.deleteCategory(id);
    if (!category) {
      throw new NotFoundException('Category not found or not exist');
    }

    return plainToInstance(CategoryDto, category);
  }
}
