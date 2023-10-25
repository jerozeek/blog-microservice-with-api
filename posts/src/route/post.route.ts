import {Application, Request, Response} from 'express';
import { use } from '../Core/middleware/use.middleware';
import { PostsAuth } from '../middleware/posts.middleware';
import {Auth} from "../middleware/auth.middleware";
import amqplib from "amqplib";
import {IPostsService} from "../entity/posts.entity";
import {PostsFacade} from "../facade/posts.facade";
import {PostsResource} from "../resource/posts.resource";
import {PostsSubscribeMessage} from "../Core/Brokers/message.subscribe";

export const postsRouter = (app:Application, channel: amqplib.Channel) => {
    const postsService: IPostsService = PostsFacade.Service();
    PostsSubscribeMessage(channel, postsService);

    app.use(Auth.guard);

    app.post('/posts/create', [PostsAuth.canCreatePosts], use((req: Request, res: Response) => {
        postsService.createPost(PostsAuth.postDto).then(async (post) => {
            res.status(201).json({
                status: 201,
                message: "Post created successfully",
                data: await PostsResource.single(post)
            });
        }).
        catch((error) => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    }))


    app.get('/posts/user/get', use((req: Request, res: Response) => {
        postsService.getUsersPosts(req.user.id).then(async (posts) => {
            res.status(200).json({
                status: 200,
                message: "Posts retrieved successfully",
                data: await PostsResource.collection(posts)
            });
        }).
        catch((error) => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    }));

    app.get('/posts/all', use((req: Request, res: Response) => {
        postsService.getAllPosts().then(async (posts) => {
            res.status(200).json({
                status: 200,
                message: "Posts retrieved successfully",
                data: await PostsResource.collection(posts)
            });
        }).
        catch((error) => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    }));
}
