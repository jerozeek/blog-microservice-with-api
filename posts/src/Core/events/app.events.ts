import {Application, NextFunction, Request, Response} from "express";
import {PostsFacade} from "../../facade/posts.facade";
export const PostEvents = (app:Application) => {

    const service = PostsFacade.Service();

    app.use("/app-events", async (req: Request, res: Response, next: NextFunction) => {
        const { payload } = req.body;
        await service.subscribeEvents(payload);
        console.log("==================================== COMMENTS EVENT  ====================================");
        return res.status(200).json(payload);
    });

}
