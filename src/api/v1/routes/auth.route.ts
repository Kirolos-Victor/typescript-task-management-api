import {Router} from 'express';
import validateMiddleware from "../middlewares/validate.middleware";
import {login, register} from "../controllers/auth.controller";
import {loginSchema, registerSchema} from "../schemas/auth.schema";

const router = Router();

router.post('/login', validateMiddleware(loginSchema), login);
router.post('/register', validateMiddleware(registerSchema), register)
export default router;