import { IPostsService } from "../entity/posts.entity";
import { Request, Response } from "express";
import { PostsResource } from "../resource/posts.resource";
import { PostsFacade } from "../facade/posts.facade";
import { PostsAuth } from "../middleware/posts.middleware";

export class PostsController {

    private static readonly postsService: IPostsService = PostsFacade.Service();

    public static async getAllPosts(req: Request, res: Response):Promise<void>  {
        PostsController.postsService.getAllPosts().then(async (posts) => {
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
    }

    public static async getPostsByUserId(req: Request, res: Response):Promise<void>  {
        PostsController.postsService.getUsersPosts(req.user.id).then(async (posts) => {
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
    }

    public static async getPostById(req: Request, res: Response):Promise<void>  {
        PostsController.postsService.getPostById(req.params.id).then(async (post) => {
            res.status(200).json({
                status: 200,
                message: "Post retrieved successfully",
                data: await PostsResource.single(post)
            });
        }).
        catch((error) => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    }

    public static async createPost(req: Request, res: Response):Promise<void> {
        PostsController.postsService.createPost(PostsAuth.postDto).then(async (post) => {
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
    }

}
