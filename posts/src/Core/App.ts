import {Server} from "http";
import express, {Application} from "express";
import * as mongoose from "mongoose";
import {getDBConnectionUrl} from "./db";
import {handlers} from "./middleware/app.middleware";
import env from './utils/env';
import { PostsMessageChannel } from "./Brokers/message.channel";

export class App {

    public static readonly app: Application = express();

    private static server:Server;

    public static async init(): Promise<void> {
        //create channel
        const channel = await PostsMessageChannel();

        //app middleware
        handlers(App.app, channel);

        // initialize the database
        await App.initDB();
    }

    private static async initDB() {
        let uri = getDBConnectionUrl();
        mongoose.set('strictQuery', false);
        mongoose.connect(uri).then(() => {
            App.server = App.app.listen(env.PORT);
            console.log('connected to db on port: '+ env.PORT);
        });

        process.on('SIGINT', () => {
            mongoose.connection.close(true).then(() => {
                process.exit(0);
            });
        });
    }

    public static async stopServer(): Promise<void> {
        App.server.close();
        return mongoose.disconnect();
    }

}
