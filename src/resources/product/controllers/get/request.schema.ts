/**
 * JSON schema representing payload from GET /products request.
 */
export const GetProductsRequestSchema = {
    type: 'object',
    properties: {
        pageSize: {
            type: 'number',
            minimum: 1
        },
        currency: {
            type: 'string',
            enum: ['CAD', 'USD'],
            default: 'USD'
        }
    },
    required: [],
    additionalProperties: false
}
