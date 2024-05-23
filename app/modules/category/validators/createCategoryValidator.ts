import vine from "@vinejs/vine";

const createCategoryValidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(255),
        is_active: vine.boolean()
    })
);

const updateCategoryValidator = vine.compile(
    vine.object({
        name: vine.string().optional(),
        is_active: vine.boolean().optional()
    })
)

export {
    createCategoryValidator,
    updateCategoryValidator
}
