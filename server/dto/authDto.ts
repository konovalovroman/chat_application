import { z } from 'zod';

export const authDto = z.object({
    username: z.string(),
    password: z.string().min(8),
});

export type AuthDto = z.infer<typeof authDto>;
