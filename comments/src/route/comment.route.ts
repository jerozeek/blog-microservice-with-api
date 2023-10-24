import { Router } from 'express';
import { use } from '../Core/middleware/use.middleware';
import { CommentAuth } from '../middleware/comment.middleware';
import { CommentController } from '../http/comment.controller';
import {Auth} from "../middleware/auth.middleware";

const router = Router();

router.use(Auth.guard);
router.post('/create', [CommentAuth.canCreateComment], use(CommentController.create))
router.get('/get/:postId', use(CommentController.getCommentsByPostId));

export = router;
