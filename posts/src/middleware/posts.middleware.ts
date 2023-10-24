import { NextFunction, Request, Response } from 'express';
import { CreatePostsSchema } from './validation.middleware';
import { IPostsDto } from '../entity/posts.entity';

export class PostsAuth {

    public static postDto: IPostsDto;

    public static async canCreatePosts(req: Request, res: Response, next: NextFunction):Promise<void> {
        try {
            const data = CreatePostsSchema.safeParse(req.body);
            if (!data.success) throw new Error(data.error.issues[0].message);

            PostsAuth.postDto = {
                ...data.data,
                userId: req.user.id
            }

            return next();
        }
        catch (error) {
            next(error);
        }
    }

}
