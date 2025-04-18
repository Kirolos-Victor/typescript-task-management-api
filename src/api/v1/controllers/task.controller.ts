import {NextFunction, Request, Response} from 'express';
import {createNewTask, getAllTasks, getTaskById} from "../services/task.service";

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }

};
export const getTask = async (req: Request, res: Response, next: NextFunction) => {
    const taskId: number = parseInt(req.params.id);
    try {
        const task = await getTaskById(taskId);
        if (!task) {
            res.status(404).json({message: 'Task not found'});
        }
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    const {name} = req.body;
    try {
        const task = await createNewTask(name);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};
