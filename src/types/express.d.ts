import {Request} from 'express';

declare module 'express' {
    interface Request {
        user?: {
            userId: string;
            name: string;
            email: string;
            createdAt: Date;
        };
    }

}
