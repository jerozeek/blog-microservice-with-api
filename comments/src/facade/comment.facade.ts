import { ICommentRepository } from "../entity/comment.entity";
import CommentRepository from "../repository/comment.repository";
import { CommentService } from "../service/comment";



export class CommentFacade {

    public static Repository: ICommentRepository = CommentRepository;

    public static Service = () => new CommentService(CommentFacade.Repository);

}