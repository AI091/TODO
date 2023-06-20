import jwt , { JwtPayload , Secret} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
const absolutePath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: absolutePath });

export interface AuthenticatedRequest extends Request {
    user_id?: number ; 
}   


export const authorization = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Auth Error' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;
    
        req.user_id  = decoded.id;
        next();
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Invalid Token' });
    }
};
