import { z } from "zod";

export const CreatePostsSchema = z.object({
    title: z.string().min(3).max(255),
    content: z.string(),
    published: z.boolean(),
});