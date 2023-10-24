import {Server} from "http";
import express, {Application} from "express";
import * as mongoose from "mongoose";
import {handlers} from "./middleware/app.middleware";
import env from './utils/env';

export class App {

    public static readonly app: Application = express();

    private static server:Server;

    public static async init(): Promise<void> {
        App.server = App.app.listen(env.PORT);
        console.log('connected to port: '+ env.PORT);

        //app middleware
        handlers(App.app);
    }

    public static async stopServer(): Promise<void> {
        App.server.close();
        return mongoose.disconnect();
    }

}
