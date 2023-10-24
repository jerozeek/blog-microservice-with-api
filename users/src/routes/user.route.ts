import { Router } from 'express';
import { UserController } from '../http/user.controller';
import {use} from "../Core/middleware/use.middleware";

const router = Router();

router.post('/update-profile/:id', use(UserController.updateProfile));
router.get('/get-profile', use(UserController.getProfile));

export = router;
