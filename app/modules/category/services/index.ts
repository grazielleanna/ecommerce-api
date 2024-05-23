import NotFoundException from "#exceptions/notFoundException";
import { CategoryData } from "../interfaces/index.js";
import Category from "../models/index.js";

export class CategoryService {
    public async getAllCategories() {
        const categories = await Category.query();

        return categories;
    }

    public async getCategoryById(categoryId: number) {
        const category = await Category.findBy('id', categoryId);

        if (!category) {
            throw new NotFoundException(`Category with id ${categoryId} not found.`);
        }

        return category;
    }

    public async createCategory(requestBody: CategoryData) {
        const category = await Category.create(requestBody);

        return category;
    }

    public async updateCategory(requestBody: Partial<CategoryData>, categoryId: number) {
        const category = await Category.findBy('id', categoryId);

        if (!category) {
            throw new NotFoundException(`Category with id ${categoryId} not found.`);
        }

        category.merge(requestBody).save();

        return category
    }

    public async deleteCategory(categoryId: number) {
        let category = await Category.findBy('id', categoryId);

        if (!category) {
            throw new NotFoundException(`Category with id ${categoryId} not found.`);
        }

        return category.delete();
    }
}