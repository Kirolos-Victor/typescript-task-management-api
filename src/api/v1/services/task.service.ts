import {prisma} from "../../../lib/prisma";

export const getAllTasks = async () => {
    return prisma.task.findMany();
};
export const getTaskById = async (taskId: number) => {
    return prisma.task.findUnique({
        where: {id: taskId},
    });
};

export const createNewTask = async (name: string) => {
    return prisma.task.create({
        data: {name},
    });
};
