
import {Application, NextFunction, Request, Response} from "express";
import {CommentFacade} from "../../facade/comment.facade";
export const CommentsEvents = (app:Application) => {

    const service = CommentFacade.Service();

    app.use("/app-events", async (req: Request, res: Response, next: NextFunction) => {
        const { payload } = req.body;
        //await service.subscribeEvents(payload);
        console.log("==================================== POSTS EVENT  ====================================");
        return res.status(200).json(payload);
    });

}
