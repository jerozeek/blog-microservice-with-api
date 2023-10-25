import {Application, Request, Response} from 'express';
import {use} from "../Core/middleware/use.middleware";
import {Auth} from "../middleware/auth.middleware";
import {UserFacade} from "../facade/user.facade";
import {UserResource} from "../resource/user.resource";
import amqplib from "amqplib";

export const userRoute = (app: Application, channel: amqplib.Channel) => {

    app.use(Auth.guard);

    const userServices = UserFacade.Service();

    app.post('/user/update-profile/:id', use((req:Request, res: Response) => {
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


    app.get('/user/get-profile', use((req:Request, res: Response) => {
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
