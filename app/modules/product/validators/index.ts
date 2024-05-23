import vine from "@vinejs/vine";

const createProductValidator = vine.compile(
    vine.object({
        title: vine.string().maxLength(255),
        description: vine.string().maxLength(255),
        price: vine.number(),
        discountPercentage: vine.number().nullable().optional(),
        rating: vine.number(),
        stock: vine.number(),
        category_id: vine.number(),
        thumbnail: vine.file({
            size: '1mb',
            extnames: ['jpg', 'jpeg', 'png']
        }),
        images: vine.file({
            size: '1mb',
            extnames: ['jpg', 'jpeg', 'png']
        }),
        is_active: vine.boolean()
    })
);

const updateProductValidator = vine.compile(
    vine.object({
        title: vine.string().maxLength(255).optional(),
        description: vine.string().maxLength(255).optional(),
        price: vine.number().optional(),
        discountPercentage: vine.number().nullable().optional(),
        rating: vine.number().optional(),
        stock: vine.number().optional(),
        category_id: vine.number().optional(),
        thumbnail: vine.file({
            size: '1mb',
            extnames: ['jpg', 'jpeg', 'png']
        }).optional(),
        images: vine.file({
            size: '1mb',
            extnames: ['jpg', 'jpeg', 'png']
        }).optional(),
        is_active: vine.boolean().optional()
    })
)

export {
    createProductValidator,
    updateProductValidator
}