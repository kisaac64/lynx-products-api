import * as ProductsControllers from './controllers/index'
import { Router } from 'express'

/** Exported router to store all products endpoint and their controller mappings */
export const ProductsRouter = Router()

/** Mapping GET /products endpoint with {@link ProductsControllers.GetController} */
ProductsRouter.get('/', ProductsControllers.GetController)

/** Mapping GET /products/{id} endpoints with {@link ProductsControllers.GetByIdController} */
ProductsRouter.get('/:id', ProductsControllers.GetByIdController)
