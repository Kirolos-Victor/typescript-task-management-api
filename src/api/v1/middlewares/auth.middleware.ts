import {Request, Response, NextFunction} from 'express';
import {verifyJwt} from "../../../lib/jwt";
import {TokenDecode} from "../../../utils/types";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || null;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({message: 'Unauthorized'});
    }

    const token: string = authHeader?.split(' ')[1] || 'unknown';

    if (token == "unknown") {
        res.status(401).json({message: 'there is not token'});
    }

    const payload = verifyJwt<TokenDecode>(token);

    if (!payload) {
        res.status(401).json({message: 'Invalid or expired token'});
        return;
    }

    req.user = payload;
    next();
};
