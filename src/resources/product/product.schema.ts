/**
 * JSON schema representing single product data from database.
 */
export const ProductSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int32',
            minimum: 1
        },
        name: {
            type: 'string',
            minLength: 1,
            maxLength: 150
        },
        price: {
            type: 'number',
            minimum: 1
        },
        description: {
            type: 'string',
            minLength: 1,
            maxLength: 150,
            nullable: true,
            default: null
        },
        isDeleted: {
            type: 'integer',
            enum: [0, 1],
            default: 0
        },
        productViewed: {
            type: 'integer',
            format: 'int32',
            minimum: 1
        },
        createdDate: {
            type: 'string',
            format: 'date-time'
        }
    },
    required: [
        'id',
        'name',
        'price',
        'description',
        'isDeleted',
        'productViewed',
        'createdDate'
    ],
    additionalProperties: false
}

console.log(JSON.stringify(ProductSchema))