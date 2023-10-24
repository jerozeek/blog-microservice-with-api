import { Application } from "express";
import commentsRoute from "../route/comment.route";

export const Register = (app: Application): void => {
    app.use(commentsRoute)
}
