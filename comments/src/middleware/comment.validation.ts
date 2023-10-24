import { z } from 'zod';

export const CreateCommentSchema = z.object({
    postId: z.string(),
    message: z.string(),
});


