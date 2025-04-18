import {prisma} from "../../../lib/prisma";
import {signJwt} from "../../../lib/jwt";
import bcrypt from "bcrypt";


export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const accessToken = signJwt({
        userId: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    }, '15m');

    const refreshToken = signJwt({userId: user.id}, '7d');

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};

export const registerUser = async (name: string, email: string, password: string) => {
    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
}
