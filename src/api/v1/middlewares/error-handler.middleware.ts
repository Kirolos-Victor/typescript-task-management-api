import {NextFunction, Request, Response} from "express";
import logger from "../../../utils/logger";

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    logger.error('Message:', err.message);
    logger.error('Stack:', err.stack);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
    });
    return;
}