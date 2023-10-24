import { Application } from "express";
import proxy from "express-http-proxy";

const BASE_PATH = '/api/v1';
export const Register = (app: Application): void => {
    app.use(BASE_PATH + '/auth', proxy('http://localhost:9002/auth'));
    app.use(BASE_PATH + '/user', proxy('http://localhost:9002/user'));
    app.use(BASE_PATH + '/posts', proxy('http://localhost:9001/posts'));
    app.use(BASE_PATH + '/comments', proxy('http://localhost:9000/comments'));
}

