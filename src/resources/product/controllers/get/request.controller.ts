import { CurrencyService } from '../../../currency/currency.service'
import { GetProductsRequestSchema } from './request.schema'
import { Request, Response, NextFunction } from 'express'
import { ProductService } from '../../product.service'
import { GetProductsRequest } from './request.model'
import { ajvClient } from '../../../../lib/ajv.lib'

/**
 * Variable to store compiled validation function for {@link GetProductsRequestSchema}
 */
const validate = ajvClient.compile(GetProductsRequestSchema)

/**
 * Controller to fetch all products sorted by their view count.
 *
 * @param request Instance of express Request class.
 * @param response Instance of express Response class.
 * @param next Instance of express NextFunction class.
 *
 * @description
 * Responses:
 * 1) Returns status 200 with all products available in the database.
 * 2) Returns status 400 with error data when payload is invalid.
 */
export const GetController = async (
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

        const products = await ProductService.getProducts(payload.pageSize)

        /**
         * Checking if the currency provided is CAD from the query parameters.
         * If CAD, converting all prices with to CAD using {@link CurrencyService.usdToCadRate}.
         */
        if (payload.currency == 'CAD') {
            const usdCadRate = await CurrencyService.usdToCadRate()

            products.forEach((product) => (product.price *= usdCadRate))
        }

        return response.status(200).send({ products })
    } catch (error) {
        console.log(error)

        next(error)
    }
}

/**
 * Extracts required payload {@link GetProductsRequest} from current request.
 *
 * @param request Instance of express Request class.
 *
 * @returns Extracted {@link GetProductsRequest} from current request.
 */
const extractPayload = (request: Request) => {
    const pageSize = Number(request.query.pageSize) || 5
    const currency =
        (request.query.currency as GetProductsRequest['currency']) || 'USD'

    return { pageSize, currency }
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
