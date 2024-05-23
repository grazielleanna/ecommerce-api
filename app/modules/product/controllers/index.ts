import { inject } from "@adonisjs/core";
import ProductService from "../services/index.js";
import { HttpContext } from "@adonisjs/core/http";
import { createProductValidator, updateProductValidator } from "../validators/index.js";

@inject()
export default class ProductControllers {
    constructor(protected productService: ProductService) { }

    async index({ response, request }: HttpContext) {
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 10);

        const products = await this.productService.getAllProducts(page, perPage);

        return response.ok(products)
    }

    async show({ response, params }: HttpContext) {
        const productId = params.id;

        const product = await this.productService.getProductById(productId);

        return response.ok(product);
    }

    async store({ request, response }: HttpContext) {
        const requestBody = await request.validateUsing(createProductValidator);
        const files = request.files('images');
     
        const product = await this.productService.createProduct(requestBody, files);

        return response.ok(product)
    }

    async update({ request, response, params }: HttpContext) {
        const requestBody = await request.validateUsing(updateProductValidator);
        const files = request.files('images');
        
        const productId = params.id;
        const product = await this.productService.updateProduct(requestBody, productId, files);

        return response.ok(product);
    }
}