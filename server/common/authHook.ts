import { FastifyReply, FastifyRequest } from 'fastify';
import { CurrentUser } from '../types/currentUser';

export const authHook = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    try {
        const user = await request.jwtVerify<CurrentUser>();
        request.currentUser = user;
    } catch (err) {
        reply
            .status(401)
            .send({ status: reply.statusCode, error: 'Unauthorized' });
    }
};
