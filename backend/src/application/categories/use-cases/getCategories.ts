import { plainToInstance } from 'class-transformer';

import { CategoryDto } from '../dto/category.dto';
import { CategoryRepository } from '@/domain/interfaces/category-repository';

export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute() {
    const categories = await this.categoryRepository.getAllCategories();
    if (!categories) {
      return [];
    }

    return plainToInstance(CategoryDto, categories);
  }
}
