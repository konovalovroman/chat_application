import { fastifyAwilixPlugin, diContainer } from '@fastify/awilix';
import { asClass, asFunction, Lifetime } from 'awilix';
import { FastifyInstance } from 'fastify';
import { AuthService } from '../core/services/authService';
import { UsersService } from '../core/services/usersService';
import { ChatsService } from '../core/services/chatsService';
import { MessagesService } from '../core/services/messagesService';

export const container = async (app: FastifyInstance) => {
    app.register(fastifyAwilixPlugin, {
        disposeOnClose: true,
        disposeOnResponse: true,
    });
    diContainer.register({
        authService: asClass(AuthService, {
            lifetime: Lifetime.SINGLETON,
        }),
        usersService: asClass(UsersService, {
            lifetime: Lifetime.SINGLETON,
        }),
        chatsService: asFunction(
            ({ usersService }) => {
                return new ChatsService(usersService);
            },
            {
                lifetime: Lifetime.SINGLETON,
            },
        ),
        messagesService: asFunction(({ usersService, chatsService }) => {
            return new MessagesService(usersService, chatsService);
        }),
    });
};
