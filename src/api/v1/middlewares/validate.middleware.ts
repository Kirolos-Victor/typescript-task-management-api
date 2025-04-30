import {AnyZodObject} from 'zod';
import {Request, Response, NextFunction} from 'express';

const validateMiddleware = (schema: AnyZodObject) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: error.errors,
        });
    }
};

export default validateMiddleware;
