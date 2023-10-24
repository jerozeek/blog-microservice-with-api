import {Application, NextFunction, Request, Response} from "express";
import {UserFacade} from "../../facade/user.facade";

export const UsersEvents = (app:Application) => {

    const service = UserFacade.Service();

    app.use("/app-events", async (req: Request, res: Response, next: NextFunction) => {
        const { payload } = req.body;
        await service.subscribeEvents(payload);
        console.log("==================================== Users EVENT  ====================================");
        return res.status(200).json(payload);
    });

}
