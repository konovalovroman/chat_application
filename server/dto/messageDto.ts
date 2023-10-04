import { z } from 'zod';

const createMessageDto = z.object({
    text: z.string(),
    author: z.string(),
    chat: z.string(),
});

export type CreateMessageDto = z.infer<typeof createMessageDto>;
