import { IPosts, IPostsDto, IPostsRepository} from "../entity/posts.entity";
import PostsModel from "../schema/posts.schema";

let instance: IPostsRepository;

class PostsRepository implements IPostsRepository {

    constructor() {
        if (instance) {
            throw new Error("Error: Instantiation failed: Use PostsRepository.getInstance() instead of new.");
        }
        instance = this;
    }

    public getInstance(): IPostsRepository {
        return instance;
    }

    public async findAll(): Promise<IPosts[]> {
        return await PostsModel.find({}).sort({ createdAt: -1}) as unknown as IPosts[];
    }
    public async findByUserId(userId: string): Promise<IPosts[]> {
       return await PostsModel.find({ userId: userId }).sort({ createdAt: -1}) as unknown as IPosts[];
    }
    public async findById(id: string): Promise<IPosts> {
        return await PostsModel.findById(id) as unknown as IPosts;
    }
    public async create(data: IPostsDto): Promise<IPosts> {
        return await PostsModel.create(data) as unknown as IPosts;
    }

    async update(id: string, data: Partial<IPosts>): Promise<IPosts> {
        return await PostsModel.findByIdAndUpdate(id, data, { new: true }) as unknown as IPosts;
    }

}

const postsRepository = new PostsRepository();
export default postsRepository.getInstance();
