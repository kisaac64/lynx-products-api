import { Request, Response, NextFunction } from 'express'

/**
 * Middleware to catch all the errors during the request execution.
 * Sends 405 status to client with `Unexpected client-side request error.` message.
 *
 * @param _req Instance of express Request class.
 * @param res Instance of express Response class.
 * @param _next Instance of express NextFunction class.
 * */
export function methodNotAllowedMiddleware(
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (!res.headersSent) {
        res.status(405).send({
            message: 'Unexpected client-side request error.'
        })
    }
}
