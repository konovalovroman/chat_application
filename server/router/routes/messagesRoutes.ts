import { diContainer } from '@fastify/awilix';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { authHook } from '../../common/authHook';

export const messagesRoutes = async (app: FastifyInstance) => {
    const messagesService = diContainer.resolve('messagesService');

    app.addHook('preHandler', authHook);

    app.log.info('Mapped /messages routes');
};
