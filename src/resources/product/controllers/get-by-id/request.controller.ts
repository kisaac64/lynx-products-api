import { GetProductByIdRequestSchema } from './request.schema'
import { Request, Response, NextFunction } from 'express'
import { GetProductByIdRequest } from './request.model'
import { ProductService } from '../../product.service'
import { ajvClient } from '../../../../lib/ajv.lib'

/**
 * Variable to store compiled validation function for {@link GetProductByIdRequestSchema}
 */
const validate = ajvClient.compile(GetProductByIdRequestSchema)

/**
 * Controller to fetch a product from mysql using `id` path parameters.
 *
 * @param request Instance of express Request class.
 * @param response Instance of express Response class.
 * @param next Instance of express NextFunction class.
 *
 * @description
 * Responses:
 * 1) Returns status 200 with product data when product is found.
 * 2) Returns status 400 with error data when payload is invalid.
 * 3) Returns status 404 with message when product is not found.
 */
export const GetByIdController = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const payload = extractPayload(request)
        const isPayloadValid = validate(payload)

        /**
         * Checking if the payload satisfies {@link GetProductByIdRequestSchema}.
         * If invalid sending error to client using {@link sendPayloadError}.
         */
        if (!isPayloadValid) {
            return sendPayloadError(response)
        }

        const product = await ProductService.getProductById(payload.id)

        /**
         * Checking if the product is found with the given id {@link GetProductByIdRequest.id}.
         * If invalid sending error to client using {@link sendProductNotFoundError}.
         */
        if (!product) {
            return sendProductNotFoundError(response)
        }

        /** Incrementing the view count by 1, once the product is fetched successfully. */
        await product.update({ productViewed: product.productViewed + 1 })

        return response.status(200).send({ product })
    } catch (error) {
        next(error)
    }
}

/**
 * Extracts required payload {@link GetProductByIdRequest} from current request.
 *
 * @param request Instance of express Request class.
 *
 * @returns Extracted {@link GetProductByIdRequest} from current request.
 */
const extractPayload = (request: Request): GetProductByIdRequest => {
    return { id: +request.params.id }
}

/**
 * Returns 400 error to the client with errors string array.
 *
 * @param response Instance of express Response class.
 */
const sendPayloadError = (response: Response) => {
    return response //
        .status(400)
        .send({
            errors: ajvClient //
                .errorsText(validate.errors)
                .split(', ')
        })
}

/**
 * Returns 404 error to the client with `Product could not be found.` message.
 *
 * @param response Instance of express Response class.
 */
const sendProductNotFoundError = (response: Response) => {
    return response //
        .status(404)
        .send({ message: 'Product could not be found.' })
}
