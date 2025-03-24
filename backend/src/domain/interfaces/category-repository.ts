import { Category } from '../entities';

export interface CategoryRepository {
  getAllCategories(): Promise<Category[] | null>;
  getCategoryById(id: string): Promise<Category | null>;
  saveCategory(category: Category): Promise<Category | null>;
  updateCategory(category: Category): Promise<Category | null>;
  deleteCategory(id: string): Promise<Category | null>;
  validateCategory(name: string, en_name: string): Promise<Category | null>;
}
