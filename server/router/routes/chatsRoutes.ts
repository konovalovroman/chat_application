import { diContainer } from '@fastify/awilix';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { createChatDto } from '../../dto/chatDto';
import { Chat } from '../../core/entities/chat';
import { CurrentUser } from '../../types/currentUser';
import { authDto } from '../../dto/authDto';
import { authHook } from '../../common/authHook';

export const chatsRoutes = async (app: FastifyInstance) => {
    const chatsService = diContainer.resolve('chatsService');

    app.addHook('preHandler', authHook);

    app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        const { currentUser } = request;
        const chats = await chatsService.findAll(currentUser.sub);
        return reply
            .status(200)
            .send({ status: reply.statusCode, result: chats });
    });

    app.get(
        '/:chatId',
        async (
            request: FastifyRequest<{ Params: { chatId: string } }>,
            reply: FastifyReply,
        ) => {
            const { chatId } = request.params;
            const chat = await chatsService.findById(chatId);
            if (!chat) {
                return reply.status(404).send({
                    status: reply.statusCode,
                    message: 'Chat not found.',
                });
            }
            return reply
                .status(200)
                .send({ status: reply.statusCode, result: chat });
        },
    );

    app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        const { type, members } = createChatDto.parse(request.body);
        const chat =
            type === 'personal'
                ? await chatsService.createPersonalChat(members)
                : await chatsService.createGroupChat(members);
        if (!chat) {
            return reply.status(400).send({
                status: reply.statusCode,
                message: 'Chat creation error',
            });
        }
        return reply
            .status(200)
            .send({ status: reply.statusCode, result: chat });
    });

    app.log.info('Mapped /chats routes');
};
