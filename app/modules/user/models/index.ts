import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { v4 as uuid } from 'uuid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
    currentAccessToken?: AccessToken

    @column({ isPrimary: true })
    declare id: number

    @column()
    declare uuid: string

    @column()
    declare name: string | null

    @column()
    declare email: string

    @column()
    declare is_active: boolean

    @column()
    declare phone: string;

    @column()
    declare is_super_admin: boolean

    @column({ serializeAs: null })
    declare password: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null

    @beforeCreate()
    public static async createUUID(model: User) {
        model.uuid = uuid();
    }

    static accessTokens = DbAccessTokensProvider.forModel(User, {
        expiresIn: '8 hours',
        prefix: 'oat_',
        table: 'auth_access_tokens',
        type: 'auth_token',
        tokenSecretLength: 40
    })
}