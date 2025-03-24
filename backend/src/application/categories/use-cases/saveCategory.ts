import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Category } from '@/domain/entities';
import { plainToInstance } from 'class-transformer';

import { CategoryDto } from '../dto/category.dto';
import { SaveCategoryDto } from '../dto/saveCategory.dto';
import { CategoryRepository } from '@/domain/interfaces/category-repository';

export class SaveCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(data: SaveCategoryDto) {
    const categoryExist = await this.categoryRepository.validateCategory(
      data.name,
      data.en_name,
    );
    if (categoryExist) {
      throw new ConflictException('Category already exists');
    }
    const dataToSave = new Category(data);
    const category = await this.categoryRepository.saveCategory(dataToSave);

    if (!category)
      throw new InternalServerErrorException('Error saving category');

    return plainToInstance(CategoryDto, category);
  }
}
