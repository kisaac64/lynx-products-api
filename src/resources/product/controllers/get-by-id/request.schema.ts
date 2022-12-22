/**
 * JSON schema representing payload from GET /products/{id} request.
 */
export const GetProductByIdRequestSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            minimum: 1
        }
    },
    required: [],
    additionalProperties: false
}
