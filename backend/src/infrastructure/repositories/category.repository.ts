import { Category } from '@/domain/entities';
import { PrismaService } from '../orm/prisma.service';

export class CategoryPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves all categories from the database.
   *
   * @returns A promise that resolves with an array of Category objects.
   */
  async getAllCategories() {
    const result = await this.prisma.category.findMany();

    return result;
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

    return result;
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

    return result;
  }

  /**
   * Updates a category in the database.
   *
   * @param id - The unique identifier of the category to update.
   * @param category - The updated Category object.
   * @returns A promise that resolves with the updated Category object.
   */
  async updateCategory(id: string, category: Category) {
    const result = await this.prisma.category.update({
      where: { id },
      data: category,
    });

    return result;
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

    return result;
  }
}
