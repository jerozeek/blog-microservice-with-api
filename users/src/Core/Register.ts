import { Application } from "express";
import userRoutes from "../routes/user.route";
import authRoutes from "../routes/auth.route";

export const Register = (app: Application): void => {
    app.use(`/`, userRoutes);
    app.use(`/`, authRoutes);
}
