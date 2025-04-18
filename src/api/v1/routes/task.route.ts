import {Router} from 'express';
import validateMiddleware from "../middlewares/validate.middleware";
import {createTaskSchema} from "../schemas/task.schema";
import {createTask, getTask, getTasks} from "../controllers/task.controller";

const router = Router();

router.get('', getTasks);
router.get('/:id', getTask)
router.post('', validateMiddleware(createTaskSchema), createTask)
export default router;