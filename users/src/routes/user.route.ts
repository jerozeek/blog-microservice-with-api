import {Application, Request, Response} from 'express';
import {use} from "../Core/middleware/use.middleware";
import {Auth} from "../middleware/auth.middleware";
import {UserFacade} from "../facade/user.facade";
import {UserResource} from "../resource/user.resource";
import amqplib from "amqplib";
import {throttle} from "../Core/middleware/throttle.middleware";

export const userRoute = (app: Application, channel: amqplib.Channel) => {

    const userServices = UserFacade.Service();

    app.use([throttle()]);
    app.post('/auth/login', [Auth.canSignIn],  use((req: Request, res:Response) => {
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
    app.post('/auth/register', [Auth.canSignUp],  use((req: Request, res:Response) => {
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

    app.use(Auth.guard);

    app.post('/update-profile/:id', use((req:Request, res: Response) => {
        userServices.updateUser(req.params.id, req.body).then((user) => {
            return res.status(200).json(UserResource.single(user));
        }).
        catch((error) => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        })
    }));
    app.get('/get-profile', use((req:Request, res: Response) => {
        userServices.getUser(req.body.id).then((user) => {
            return res.status(200).json(UserResource.single(user));
        }).
        catch((error) => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        })
    }))
}
