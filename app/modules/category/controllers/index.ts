import { HttpContext } from "@adonisjs/core/http";
import { CategoryService } from "../services/index.js";
import { inject } from "@adonisjs/core";
import { createCategoryValidator, updateCategoryValidator } from "../validators/createCategoryValidator.js";
import { CategoryData } from "../interfaces/index.js";

@inject()
export default class CategoryController {
    constructor(protected categoryService: CategoryService) { }

    async index({ response }: HttpContext) {
        const categories = await this.categoryService.getAllCategories();

        return response.ok(categories)
    }

    async show({ response, params }: HttpContext) {
        const categoryId = params.id;

        const category = await this.categoryService.getCategoryById(categoryId);

        return response.ok(category);
    }

    async store({ request, response }: HttpContext) {
        const requestBody = await request.validateUsing(createCategoryValidator);

        const category = await this.categoryService.createCategory(requestBody);

        return response.ok(category);
    }

    async update({ request, response, params }: HttpContext) {
        const requestBody: Partial<CategoryData> = await request.validateUsing(updateCategoryValidator);
        const categoryId = params.id;

        const category = await this.categoryService.updateCategory(requestBody, categoryId);

        return response.ok(category);
    }

    async destroy({ response, params }: HttpContext) {
        const categoryId = params.id;

        await this.categoryService.deleteCategory(categoryId);

        return response.noContent();
    }
}