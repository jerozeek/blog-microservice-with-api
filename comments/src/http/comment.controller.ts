import { ICommentService } from "../entity/comment.entity";
import { CommentFacade } from "../facade/comment.facade";
import { NextFunction, Request, Response } from 'express';
import { CommentAuth } from "../middleware/comment.middleware";
import { CommentResource } from "../resource/comment.resource";
import { PublishPostEvents } from "../Core/utils/publish.events";

export class CommentController {

    private static readonly commentService: ICommentService = CommentFacade.Service();

    public static async create(req: Request, res: Response, next: NextFunction) {

        CommentController.commentService.createComment(CommentAuth.commentDto).then(async (comment) => {

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
            PublishPostEvents(payload);

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
    }

    public static async getCommentsByPostId(req: Request, res: Response, next: NextFunction) {
        CommentController.commentService.getCommentsByPostId(req.params.postId).then(async (comments) => {
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
    }


}
