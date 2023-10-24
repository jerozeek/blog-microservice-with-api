
export interface IPosts extends IPostsDto {
    id: string;
    comments: any[];
    createdAt: string;
    updatedAt: string;
}

export interface IPostsDto {
    userId: string;
    title: string;
    content: string;
    published: boolean;
}

export interface IPostsRepository {
    findAll(): Promise<IPosts[]>;
    findByUserId(userId: string): Promise<IPosts[]>;
    findById(id: string): Promise<IPosts>;
    create(data: IPostsDto): Promise<IPosts>;
    update(id: string, data: Partial<IPosts>): Promise<IPosts>;
}

export interface IPostsService {
    getUsersPosts(userId: string): Promise<IPosts[]>;
    getPostById(id: string): Promise<IPosts>;
    createPost(data: IPostsDto): Promise<IPosts>;
    getAllPosts(): Promise<IPosts[]>;
    addComments(postId: string, userId: string, comment: any): Promise<void>;
    subscribeEvents(payload:any): void;
}
