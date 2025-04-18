import jwt, {SignOptions} from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret';

export const signJwt = (payload: object, expiresIn: SignOptions['expiresIn']) => {

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn
    });

};

export const verifyJwt = <T>(token: string): T | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret);
        return typeof decoded === 'object' ? (decoded as T) : null;
    } catch (error) {
        return null;
    }
};