import express, {Application, Request, Response, NextFunction} from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { CORS_CONFIG } from "../config/cors";
import createHttpError from "http-errors";
import {authRoute} from "../../routes/auth.route";
import {userRoute} from "../../routes/user.route";
import amqplib from "amqplib";

export const handlers = (app: Application, channel: amqplib.Channel): void => {

    //allow express to parse json
    app.use(express.json());

    //logger
    app.use(morgan("dev"))

    //use cors
    app.use(cors(CORS_CONFIG));

    app.use(helmet());

    //routes
    userRoute(app, channel);
    authRoute(app, channel);

    //error handler
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(createHttpError(404, "Not Found"));
    });

    //error handler
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message
            }
        });
    });
}
