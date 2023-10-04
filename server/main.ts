import { getEnvVariable } from './helpers/configService';
import { buildServer } from './server';

const bootstrap = () => {
    const server = buildServer();

    server.listen({
        host: '127.0.0.1',
        port: parseInt(getEnvVariable('SERVER_PORT')),
    });
};

bootstrap();
