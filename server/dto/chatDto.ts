import { z } from 'zod';

export const createChatDto = z
    .object({
        type: z.enum(['personal', 'group']),
        members: z.array(z.string()),
    })
    .superRefine((chat, ctx) => {
        if (chat.type === 'personal' && chat.members.length !== 2) {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Personal chat can only contain 2 members',
            });
        }
        return true;
    });

export type CreateChatDto = z.infer<typeof createChatDto>;
