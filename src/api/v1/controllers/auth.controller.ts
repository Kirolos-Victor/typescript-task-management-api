import {Request, Response, NextFunction} from 'express';
import {loginUser, registerUser} from '../services/auth.service';
import bcrypt from 'bcrypt';
import {prisma} from "../../../lib/prisma";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const result = await loginUser(email, password);
        return res.json(result);
    } catch (error) {
        next(error);
    }
};
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            return res.status(409).json({message: 'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await registerUser(name, email, hashedPassword);
        return res.status(201).json({message: `User ${name} has been registered`});
    } catch (error) {
        next(error);
    }
}
