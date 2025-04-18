import {z} from "zod";

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        name: z.string().min(1, 'Name is required'),
        passwordConfirmation: z.string().min(6, 'PasswordConfirmation must be at least 6 characters long'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        path: ['passwordConfirmation'],
        message: 'Passwords do not match',
    })
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
    })
})
