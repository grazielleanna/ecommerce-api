import { BaseModel, column } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";

export default class Category extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare name: string;

    @column()
    declare is_active: boolean;

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updated_at: DateTime;
}