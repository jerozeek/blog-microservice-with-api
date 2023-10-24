import { NextFunction, Request, Response } from 'express';
import { UserFacade } from '../facade/user.facade';
import { UserResource } from '../resource/user.resource';


export class UserController {


    private static readonly userServices = UserFacade.Service();

    public static async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        UserController.userServices.updateUser(req.params.id, req.body).then((user) => {
            return res.status(200).json(UserResource.single(user));
        }).
        catch((error) => {
            next(error);
        })
    }

    public static async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        UserController.userServices.getUser(req.body.id).then((user) => {
            return res.status(200).json(UserResource.single(user));
        }).
        catch((error) => {
            next(error);
        })
    }


}