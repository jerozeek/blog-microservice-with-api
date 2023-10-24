import { Router } from 'express';
import { use } from '../Core/middleware/use.middleware';
import { PostsController } from '../http/posts.controller';
import { PostsAuth } from '../middleware/posts.middleware';
import {Auth} from "../middleware/auth.middleware";

const router = Router();

router.use(Auth.guard);

router.post('/create', [PostsAuth.canCreatePosts], use(PostsController.createPost));
router.get('/user/get', use(PostsController.getPostsByUserId));
router.get('/all', use(PostsController.getAllPosts));

export = router;
