import { Injectable } from '@nestjs/common';

import { Category } from '@/domain/entities';
import { PrismaService } from '@/infrastructure/orm/prisma.service';
import { CategoryRepository } from '@/domain/interfaces/category-repository';

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves a list of all categories from the database.
   *
   * @returns A promise that resolves with an array of Category objects, or null if no categories are found.
   */
  async getAllCategories() {
    const result = await this.prisma.category.findMany();
    if (!result) return null;

    return result.map((category) => new Category(category));
  }

  /**
   * Retrieves a category by its ID from the database.
   *
   * @param id - The unique identifier of the category to retrieve.
   * @returns A promise that resolves with the Category object if found, or null if no category is found.
   */
  async getCategoryById(id: string) {
    const result = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }
    return new Category(result);
  }

  /**
   * Saves a new category to the database.
   *
   * @param category - The Category object to be saved.
   * @returns A promise that resolves with the newly created Category object.
   */
  async saveCategory(category: Category) {
    const result = await this.prisma.category.create({
      data: category,
    });
    if (!result) return null;
    return new Category(result);
  }

  /**
   * Updates a category in the database.
   *
   * @param id - The unique identifier of the category to update.
   * @param category - The updated Category object.
   * @returns A promise that resolves with the updated Category object.
   */
  async updateCategory(category: Category) {
    const result = await this.prisma.category.update({
      where: { id: category.id },
      data: category,
    });

    return new Category(result);
  }

  /**
   * Deletes a category from the database.
   *
   * @param id - The unique identifier of the category to delete.
   * @returns A promise that resolves with the deleted category object.
   */
  async deleteCategory(id: string) {
    const result = await this.prisma.category.delete({
      where: { id },
    });

    return new Category(result);
  }

  /**
   * Validates if a category with the given name and English name already exists in the database.
   *
   * @param name - The name of the category to validate.
   * @param en_name - The English name of the category to validate.
   * @returns A promise that resolves with the existing category if found, otherwise null.
   */
  async validateCategory(name: string, en_name: string) {
    const result = await this.prisma.category.findUnique({
      where: { name_en_name: { name, en_name } },
    });

    if (!result) return null;
    return new Category(result);
  }
}
