/**
 * Model representing payload from GET /products request.
 */
export interface GetProductsRequest {
    /** Number of products to be fetched at a time. */
    pageSize?: number

    /** Required price conversion for the products. */
    currency?: 'USD' | 'CAD'
}
