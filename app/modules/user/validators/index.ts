import vine from "@vinejs/vine";

const createUserValidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(255),
        email: vine.string().email(),
        password: vine.string(),
        is_active: vine.boolean(),
        phone: vine.string(),
        is_super_admin: vine.boolean()
    })
);

const updateUserValidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(255).optional(),
        email: vine.string().email().optional(),
        password: vine.string(),
        is_active: vine.boolean().optional(),
        phone: vine.string().optional(),
        is_super_admin: vine.boolean().optional()
    })
);

const createUserLoginValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string()
    })
)

export {
    createUserValidator,
    createUserLoginValidator,
    updateUserValidator
}