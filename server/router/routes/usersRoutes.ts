import { diContainer } from '@fastify/awilix';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../../core/entities/user';
import { authHook } from '../../common/authHook';

export const usersRoutes = async (app: FastifyInstance) => {
    const usersService = diContainer.resolve('usersService');

    app.addHook('preHandler', authHook);

    app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        const users = (await usersService.findAll()) as Partial<User>[];
        users.forEach((user) => {
            delete user.password;
        });
        return reply
            .status(200)
            .send({ status: reply.statusCode, result: users });
    });

    app.get(
        '/:userId',
        async (
            request: FastifyRequest<{ Params: { userId: string } }>,
            reply: FastifyReply,
        ) => {
            const { userId } = request.params;
            const user = (await usersService.findById(userId)) as Partial<User>;
            if (!user) {
                return reply.status(404).send({
                    status: reply.statusCode,
                    message: 'User not found.',
                });
            }
            delete user.password;
            return reply
                .status(200)
                .send({ status: reply.statusCode, result: user });
        },
    );

    app.get('/me', async (request: FastifyRequest, reply: FastifyReply) => {
        const userId = request.currentUser.sub;
        console.log('userId: ', userId);
        const user = (await usersService.findById(userId)) as Partial<User>;
        if (!user) {
            return reply.status(404).send({
                status: reply.statusCode,
                message: 'User not found.',
            });
        }
        delete user.password;
        return reply
            .status(200)
            .send({ status: reply.statusCode, result: user });
    });

    app.delete(
        '/:userId',
        async (
            request: FastifyRequest<{ Params: { userId: string } }>,
            reply: FastifyReply,
        ) => {
            const { userId } = request.params;
            const { currentUser } = request;
            if (userId !== currentUser.sub) {
                return reply.status(403).send({
                    status: reply.statusCode,
                    error: 'It is forbidden to delete other users',
                });
            }
            const removedUser = (await usersService.remove(
                userId,
            )) as Partial<User>;
            if (!removedUser) {
                return reply.status(404).send({
                    status: reply.statusCode,
                    message: 'User not found.',
                });
            }
            delete removedUser.password;
            return reply
                .status(200)
                .send({ status: reply.statusCode, result: removedUser });
        },
    );

    app.log.info('Mapped /users routes');
};
