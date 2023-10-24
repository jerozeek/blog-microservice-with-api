import { Application } from "express";
import postsRoute from "../route/post.route";

export const Register = (app: Application): void => {
    app.use(postsRoute);
}
