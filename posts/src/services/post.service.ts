import {
    IPosts,
    IPostsDto,
    IPostsRepository,
    IPostsService
} from "../entity/posts.entity";

export class PostService implements IPostsService {

    constructor(private postsRepository: IPostsRepository){}

    public async getAllPosts(): Promise<IPosts[]> {
        return new Promise((resolve, reject) => {
            try {
                const posts = this.postsRepository.findAll();
                return resolve(posts);
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    public async getUsersPosts(userId: string): Promise<IPosts[]> {
        return new Promise((resolve, reject) => {
            try {
                const posts = this.postsRepository.findByUserId(userId);
                return resolve(posts);
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    public async getPostById(id: string): Promise<IPosts> {
        return new Promise((resolve, reject) => {
            try {
                const post = this.postsRepository.findById(id);
                return resolve(post);
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    public async createPost(data: IPostsDto): Promise<IPosts> {
        return new Promise((resolve, reject) => {
            try {
                const post = this.postsRepository.create(data);
                return resolve(post);
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    public async addComments(postId: string, userId: string, comment: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await this.postsRepository.findById(postId);
                post.comments.push({
                    userId,
                    comment,
                    createdAt: new Date().toISOString()
                });
                await this.postsRepository.update(postId, post);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }

    public async subscribeEvents(payload:string): Promise<void> {
        let payloadData = JSON.parse(payload);
        const { event, data } = payloadData;
        const { postId, comment, userId } = data;
        switch (event) {
            case 'COMMENT_CREATED':
                await this.addComments(postId, userId, comment);
                break;
            case 'TEST_EVENT':
                console.log("==================================== WORKING SUBSCRIBERS  ====================================");
                break;
            default:
                break;
        }
    }

}
