import Fastify, { FastifyInstance } from 'fastify';
import { router } from './router/router';
import { container } from './common/diContainer';
import { websockets } from './common/websockets';
import { dbConnector } from './common/dbConnector';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { getEnvVariable } from './helpers/configService';

export const buildServer = (): FastifyInstance => {
    const app = Fastify({
        logger: {
            transport: {
                target: 'pino-pretty',
            },
        },
    });

    app.register(dbConnector);
    app.register(container);
    app.register(router);
    app.register(websockets);
    app.register(jwt, {
        secret: getEnvVariable('JWT_SECRET'),
    });
    app.register(cors);

    return app;
};
