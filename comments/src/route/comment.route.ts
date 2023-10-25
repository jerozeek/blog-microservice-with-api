import {Application, Request, Response} from 'express';
import { use } from '../Core/middleware/use.middleware';
import { CommentAuth } from '../middleware/comment.middleware';
import {Auth} from "../middleware/auth.middleware";
import amqplib from "amqplib";
import {ICommentService} from "../entity/comment.entity";
import {CommentFacade} from "../facade/comment.facade";
import {CommentsMessagePublish} from "../Core/Brokers/message.publish";
import {CommentResource} from "../resource/comment.resource";
import env from "../Core/utils/env";

export const commentRouter = (app:Application, channel: amqplib.Channel) => {

    app.use(Auth.guard);

    const commentService: ICommentService = CommentFacade.Service();

    app.post('/create', [CommentAuth.canCreateComment], use((req: Request, res: Response) => {
        commentService.createComment(CommentAuth.commentDto).then(async (comment) => {

            //get the payload from the request
            const payload = {
                event: 'COMMENT_CREATED',
                data: {
                    postId: CommentAuth.commentDto.postId,
                    comment: CommentAuth.commentDto.message,
                    userId: req.user.id
                }
            }

            //publish the event
            CommentsMessagePublish(channel, env.POSTS_BINDING_KEY, JSON.stringify(payload));

            return res.status(200).json({
                status: 200,
                message: 'Comment created successfully',
                data: await CommentResource.single(comment)
            });
        }).
        catch((error) => {
            return res.status(500).json({
                status: 500,
                message: error.message
            });
        });
    }))

    app.get('/get/:postId', use((req: Request, res: Response) => {
        commentService.getCommentsByPostId(req.params.postId).then(async (comments) => {
            return res.status(200).json({
                status: 200,
                message: 'Comments retrieved successfully',
                data: await CommentResource.collection(comments)
            });
        }).
        catch((error) => {
            return res.status(500).json({
                status: 500,
                message: error.message
            });
        });
    }));
}
