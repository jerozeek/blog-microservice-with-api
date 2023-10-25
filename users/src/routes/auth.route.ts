import { Router } from 'express';
import { AuthController } from '../http/auth.controller';
import { Auth } from '../middleware/auth.middleware';
import {use} from "../Core/middleware/use.middleware";
import {throttle} from "../Core/middleware/throttle.middleware";

const router = Router();

router.use([throttle()]);
router.post('/auth/login', [Auth.canSignIn],  use(AuthController.doLogin));
router.post('/auth/register', [Auth.canSignUp],  use(AuthController.doRegister));

export = router;
