
export interface IComments extends ICommentsDto {
    id: string;
    createdAt: string;
}

export interface ICommentsDto  {
    postId: string
    user: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
    };
    message: string;
}

export interface ICommentRepository {
    create(data: ICommentsDto): Promise<IComments>;
    findByPostId(postId: string): Promise<IComments[]>;
}

export interface ICommentService {
    createComment(data: ICommentsDto): Promise<IComments>;
    getCommentsByPostId(postId: string): Promise<IComments[]>;
    subscribeEvents(payload:any): Promise<void>;
}
