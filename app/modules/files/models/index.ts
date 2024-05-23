import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import Product from "../../product/models/index.js";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";

export default class EcommerceFile extends BaseModel {
    static table = "files"

    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare uuid: string

    @column()
    declare file: string;

    @column()
    declare filename: string;

    @belongsTo(() => Product, {
        foreignKey: 'uuid',
        localKey: 'uuid'
    })
    declare product: BelongsTo<typeof Product>
}