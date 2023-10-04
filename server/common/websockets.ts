import websocket, { SocketStream } from '@fastify/websocket';
import { FastifyInstance, FastifyRequest } from 'fastify';

export const websockets = async (app: FastifyInstance) => {
    app.register(websocket);
    app.register(async function (fastify) {
        fastify.get(
            '/',
            { websocket: true },
            (connection: SocketStream, request: FastifyRequest) => {
                fastify.log.info('New WS connection');
                connection.socket.on('message', (message) => {
                    fastify.log.info(message.toString());
                });
                connection.socket.on('close', () => {
                    app.log.info('WS disconnected');
                });
            },
        );
    });
};
