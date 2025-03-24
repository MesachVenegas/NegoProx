import { CategoryRepository } from '@/domain/interfaces/category-repository';
import { CategoryDto } from '../dto/category.dto';
import { plainToInstance } from 'class-transformer';

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string, data: Partial<Omit<CategoryDto, 'id'>>) {
    const exist = await this.categoryRepository.getCategoryById(id);
    if (!exist) {
      throw new Error('Category not found or not exist');
    }

    exist.update(data);

    const category = await this.categoryRepository.updateCategory(exist);
    if (!category) {
      throw new Error('Error updating category');
    }

    return plainToInstance(CategoryDto, category);
  }
}
