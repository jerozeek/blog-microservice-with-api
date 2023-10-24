import { ICommentRepository, IComments, ICommentsDto} from "../entity/comment.entity";
import CommentsModel from "../schema/comment.schema";

let instance: CommentRepository;

class CommentRepository implements ICommentRepository {

    constructor() {
        if (instance) {
            throw new Error("Error - use CommentRepository.getInstance()");
        }

        instance = this;
    }

    public getInstance() {
        return instance;
    }

    async create(data: ICommentsDto): Promise<IComments> {
        return await CommentsModel.create(data) as unknown as IComments;
    }

    async findByPostId(postId: string): Promise<IComments[]> {
        return await CommentsModel.find({ postId }).sort({createdAt: -1}) as unknown as IComments[];
    }

}

const commentRepository = new CommentRepository();
export default commentRepository.getInstance();