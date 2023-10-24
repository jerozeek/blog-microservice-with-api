import { NextFunction, Request, Response } from 'express';
import { IUser } from '../entity/user.entity';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { UserFacade } from '../facade/user.facade';
import {SignInSchema, SignUpSchema} from './validation.middleware';
import env from "../Core/utils/env";

export class Auth {

    public static user: IUser;

    private static readonly userRepository = UserFacade.Repository

    public static async guard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Unauthorized");

            const accessToken= token.split(" ")[1];
            req.user = <JwtPayload>jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

            const user = await Auth.userRepository.findUserByEmail(req.user.email);
            if (!user) throw new Error("Unauthorized");

            Auth.user = user;
            next();
        }
        catch (error) {
            next(error);
        }
    }

    public static async canSignUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = SignUpSchema.safeParse(req.body);
            if (!data.success) throw new Error(data.error.issues[0].message);

            return next();
        } catch (error) {
            next(error);
        }
    }

    public static async canSignIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = SignInSchema.safeParse(req.body);
            if (!data.success) throw new Error(data.error.issues[0].message);

            Auth.user = await Auth.userRepository.findUserByEmail(data.data.email);
            next();
        } catch (error) {
            next(error);
        }
    }

}
