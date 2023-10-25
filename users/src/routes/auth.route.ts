import {Application, Router, Response, Request} from 'express';
import { Auth } from '../middleware/auth.middleware';
import {use} from "../Core/middleware/use.middleware";
import {throttle} from "../Core/middleware/throttle.middleware";
import {UserFacade} from "../facade/user.facade";
import {UserResource} from "../resource/user.resource";
import amqplib from "amqplib";

export const authRoute = (app: Application, channel: amqplib.Channel) => {

    app.use([throttle()]);

    const userServices = UserFacade.Service();

    app.post('/user/auth/login', [Auth.canSignIn],  use((req: Request, res:Response) => {
        userServices.loginUser(Auth.user, req.body.password).then(async (user) => {
            return res.status(200).json({
                status: 200,
                message: "Login successful",
                data: UserResource.single(user),
                accessToken: await userServices.generateAccessToken(user)
            });
        }).
        catch((error) => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        })
    }));


    app.post('/user/auth/register', [Auth.canSignUp],  use((req: Request, res:Response) => {
        userServices.createUser(req.body).then(async (user) => {
            return res.status(200).json({
                status: 200,
                message: "Registration successful",
                data: UserResource.single(user),
                accessToken: await userServices.generateAccessToken(user)
            });
        }).
        catch((error) => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        })
    }));

}

const router = Router();
