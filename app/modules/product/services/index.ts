import NotFoundException from "#exceptions/notFoundException";
import { saveFile } from "../../../utils/file.js";
import EcommerceFile from "../../files/models/index.js";
import { ProductData } from "../interfaces/index.js";
import Product from "../models/index.js";
import db from "@adonisjs/lucid/services/db";
import { MultipartFile } from "@adonisjs/core/bodyparser";
import { TransactionClientContract } from "@adonisjs/lucid/types/database";
import BadRequestException from "#exceptions/badRequestException";

export default class ProductService {
    public async getAllProducts(page: number, perPage: number) {
        const products = await Product.query().paginate(page, perPage);

        return products;
    }

    public async getProductById(productId: number) {
        const product = await Product.query().where('id', productId).preload('category').preload('images');

        if (!product) {
            throw new NotFoundException(`Product with id ${productId} not found.`);
        }

        return product;
    }

    public async createProduct(requestBody: ProductData, files: MultipartFile[]) {
        const { thumbnail, ...restBody } = requestBody;

        const { filePath: thumbnailPath } = await saveFile(thumbnail);
        let product: Product = {} as Product;

        await db.transaction(async (trx) => {
            product = await Product.create({ ...restBody, thumbnail: thumbnailPath }, { client: trx });
            const productUuid = product.uuid;

            await this.createFileRelationshipWithProduct(files, productUuid, trx);
        });

        return product;
    }

    public async updateProduct(requestBody: Partial<ProductData>, productId: number, files: MultipartFile[]) {
        const product = await Product.findBy('id', productId);

        if (!product) {
            throw new NotFoundException(`Product with id ${productId} not found.`);
        }

        const { thumbnail, images, ...restBody } = requestBody;

        await db.transaction(async (trx) => {
            if (thumbnail) {
                const { filePath: thumbnailPath } = await saveFile(thumbnail);

                product.merge({ thumbnail: thumbnailPath }).useTransaction(trx);
            }

            product.merge({ ...restBody }).useTransaction(trx).save();

            if (files && files?.length > 0) {
                const productUuid = product.uuid;

                await this.createFileRelationshipWithProduct(files, productUuid, trx);
            }
        });
    }

    /**
     * @author: Grazielle Conceição
     * @since: 2024-05-23
     * @description Function that handles files and creates the relationship between file and product in the database
     * @param images 
     * @param uuid 
     * @param trx 
     */
    private async createFileRelationshipWithProduct(images: MultipartFile[], uuid: string, trx: TransactionClientContract) {
        try {
            const productRelationshipImages = [];

            for (let image of images) {
                const { fileName, filePath } = await saveFile(image);

                const relationshipImage = {
                    uuid: uuid.toUpperCase(),
                    file: filePath,
                    filename: fileName
                };

                productRelationshipImages.push(relationshipImage);
            }

            await EcommerceFile.createMany(productRelationshipImages, { client: trx });
        } catch (error) {
            await trx.rollback();
            throw new BadRequestException(error);
        }
    }
}