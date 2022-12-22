import { Request, Response, NextFunction } from 'express'

/**
 * Middleware to catch all the requests to undefined endpoints and methods.
 * Sends 500 status to client with `Unexpected server-side error.` message.
 *
 * @param err Instance of global Error interface.
 * @param _req Instance of express Request class.
 * @param res Instance of express Response class.
 * @param _next Instance of express NextFunction class.
 * */
export function globalErrorMiddleware(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    return res.status(500).send({
        message: 'Unexpected server-side error.'
    })
}
