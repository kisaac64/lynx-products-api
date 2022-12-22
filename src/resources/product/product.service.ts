import { Product } from './product.model'
import { Op } from 'sequelize'

/**
 * Fetches the product data of the given id.
 *
 * @param id Id of the product to fetch data for.
 *
 * @returns Product data object wrapped in a promise.
 */
const getProductById = (id: number) => {
    return Product.findOne({
        attributes: { exclude: ['deletedDate', 'updatedDate'] },
        where: { id }
    })
}

/**
 * Fetches the products sorted by their view count.
 *
 * @param pageSize Number of products to return at a time.
 *
 * @returns Products data array wrapped in a promise.
 */
const getProducts = (pageSize = 5) => {
    return Product.findAll({
        where: { productViewed: { [Op.gte]: 1 } },
        attributes: { exclude: ['deletedDate', 'updatedDate'] },
        order: [['productViewed', 'desc']],
        limit: pageSize
    })
}

/**
 * Exported object containing all product service functions.
 *
 * @property {@link getProductById}
 * @property {@link getProducts}
 */
export const ProductService = {
    getProductById,
    getProducts
}
