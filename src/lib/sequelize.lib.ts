import { Product } from '../resources/product/product.model'
import { Dialect } from 'sequelize/types/sequelize'
import { Sequelize } from 'sequelize'

/**
 * Initializes sequelize client with configuration from environment.
 *
 * @returns Initialized {@link Sequelize} client.
 */
const initClient = () => {
    const user = process.env['MYSQL_DB_USER'] || 'root'
    const pass = process.env['MYSQL_DB_PASS'] || ''
    const host = process.env['MYSQL_DB_HOST'] || 'host'
    const database = 'lynx'

    return new Sequelize(database, user, pass, {
        dialect: process.env["SEQUELIZE_DIALECT"] as Dialect,
        logging: false,
        host
    })
}

/**
 * Initializes all the sequelize models with client.
 *
 * @param sequelize Initialized {@link Sequelize} client.
 */
const initModels = (sequelize: Sequelize) => {
    Product.initModel(sequelize)
}

/**
 * Initializes client and sequelize models using
 * {@link initClient}, {@link initModels} functions.
 */
export const init = () => {
    initModels(initClient())
}
