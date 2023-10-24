import { NextFunction, Response, Request } from "express";
import { UserFacade } from "../facade/user.facade";
import { UserResource } from "../resource/user.resource";
import { Auth } from "../middleware/auth.middleware";

export class AuthController {

    private static readonly userServices = UserFacade.Service();

    public static async doRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
        AuthController.userServices.createUser(req.body).then(async (user) => {
            return res.status(200).json({
                status: 200,
                message: "Registration successful",
                data: UserResource.single(user),
                accessToken: await AuthController.userServices.generateAccessToken(user)
            });
        }).
        catch((error) => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        })
    }

    public static async doLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        AuthController.userServices.loginUser(Auth.user, req.body.password).then(async (user) => {
            return res.status(200).json({
                status: 200,
                message: "Login successful",
                data: UserResource.single(user),
                accessToken: await AuthController.userServices.generateAccessToken(user)
            });
        }).
        catch((error) => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        })
    }

}