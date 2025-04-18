import { z } from 'zod';

export const createTaskSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Task name is required'),
    }),
});

export const updateTaskSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Task name is required'),
    }),
});


