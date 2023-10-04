import { diContainer } from '@fastify/awilix';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AuthDto, authDto } from '../../dto/authDto';

export const authRoutes = async (app: FastifyInstance) => {
    const authService = diContainer.resolve('authService');

    app.post(
        '/signup',
        async (request: FastifyRequest, reply: FastifyReply) => {
            const jwt = request.jwtVerify;
            const dto = authDto.parse(request.body);
            const token = await authService.signUp(dto);
            if (!token) {
                return reply.status(400).send({
                    code: reply.statusCode,
                    message: 'Sign up error',
                });
            }
            return token;
        },
    );

    app.post(
        '/signin',
        async (request: FastifyRequest, reply: FastifyReply) => {
            const dto = authDto.parse(request.body);
            const token = await authService.signIn(dto);
            if (!token) {
                return reply.status(400).send({
                    code: reply.statusCode,
                    message: 'Sign in error',
                });
            }
            return token;
        },
    );

    app.log.info('Mapped /auth routes');
};
