import { BaseModel, beforeCreate, column } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";
import { v4 as uuid } from 'uuid'

export default class Category extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare name: string;

    @column()
    declare uuid: string

    @column()
    declare is_active: boolean;

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updated_at: DateTime;

    @beforeCreate()
    public static async createUUID(model: Category) {
        model.uuid = uuid()
    }
}