import { methodNotAllowedMiddleware } from './middlewares/method-not-allowed.middleware'
import { globalErrorMiddleware } from './middlewares/global-error.middleware'
import { ProductsRouter } from './resources/product/product.router'
import { init as initSequelize } from './lib/sequelize.lib'
import { config as initDotEnv } from 'dotenv'
import Express from 'express'

export const app = Express()
app.use(Express.json())

/**
 * Initializes dotenv and sequelize modules using {@link initDotEnv}, {@link initSequelize},
 * bootstraps all the routers with their respective endpoints and setups middlewares.
 */
export const init = () => {
    initDotEnv()
    initSequelize()

    /** Bootstrap {@link ProductsRouter} with /products endpoint. */
    app.use('/products', ProductsRouter)

    /** Middleware to catch all the errors during the request execution. */
    app.use(methodNotAllowedMiddleware)

    /** Middleware to catch all the requests to undefined endpoints and methods. */
    app.use(globalErrorMiddleware)
}
