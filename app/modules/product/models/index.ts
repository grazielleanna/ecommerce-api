import { BaseModel, beforeCreate, belongsTo, column, hasMany } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";
import Category from "../../category/models/index.js";
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import type { HasMany } from '@adonisjs/lucid/types/relations'

import EcommerceFile from "../../files/models/index.js";
import { v4 as uuid } from 'uuid'

export default class Product extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare uuid: string

    @column()
    declare title: string;

    @column()
    declare description: string;

    @column()
    declare price: number;

    @column()
    declare discountPercentage: number | null;

    @column()
    declare rating: number;

    @column()
    declare stock: number;

    @column()
    declare thumbnail: string;

    @column()
    declare category_id: number

    @belongsTo(() => Category, {
        foreignKey: 'category_id'
    })
    declare category: BelongsTo<typeof Category>

    @hasMany(() => EcommerceFile, {
        foreignKey: 'uuid',
        localKey: 'uuid'
    })
    declare images: HasMany<typeof EcommerceFile>

    @column()
    declare is_active: boolean;

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updated_at: DateTime;

    @beforeCreate()
    public static async createUUID(model: Product) {
        model.uuid = uuid()
    }
}