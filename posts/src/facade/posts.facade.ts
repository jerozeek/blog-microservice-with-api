import { IPostsRepository } from "../entity/posts.entity";
import PostRepository from "../repository/posts.repository";
import { PostService } from "../services/post.service";

export class PostsFacade {

    public static Repository: IPostsRepository = PostRepository;

    public static Service = () => new PostService(PostsFacade.Repository);
}