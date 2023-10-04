import { CurrentUser } from './currentUser';

declare module 'fastify' {
    export interface FastifyRequest {
        currentUser: CurrentUser;
    }
}
