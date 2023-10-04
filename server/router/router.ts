import { FastifyInstance } from 'fastify';
import { authRoutes } from './routes/authRoutes';
import { usersRoutes } from './routes/usersRoutes';
import { chatsRoutes } from './routes/chatsRoutes';
import { messagesRoutes } from './routes/messagesRoutes';

export const router = async (app: FastifyInstance) => {
    app.register(authRoutes, { prefix: '/auth' });
    app.register(usersRoutes, { prefix: '/users' });
    app.register(chatsRoutes, { prefix: '/chats' });
    app.register(messagesRoutes, { prefix: '/messages' });
};
