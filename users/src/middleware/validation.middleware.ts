import { z } from 'zod';

export const SignUpSchema = z.object({
    firstname: z.string().min(3).max(255),
    lastname: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255)
});

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255)
});

