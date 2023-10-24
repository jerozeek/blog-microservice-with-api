import { NextFunction, Request, Response } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import env from "../Core/utils/env";

export class Auth {

    public static async guard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Unauthorized");

            const accessToken= token.split(" ")[1];
            req.user = <JwtPayload>jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

            next();
        }
        catch (error) {
            next(error);
        }
    }
}
