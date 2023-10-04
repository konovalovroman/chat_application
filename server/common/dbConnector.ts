import { FastifyInstance } from 'fastify';
import { connectToDatabase } from '../database/database';

export const dbConnector = async (app: FastifyInstance) => {
    app.register(async (app: FastifyInstance) => {
        app.addHook('onReady', async () => {
            try {
                await connectToDatabase();
                app.log.info('Connected to database');
            } catch (err) {
                if (err instanceof Error) {
                    app.log.fatal(err.message);
                }
                process.exit(0);
            }
        });
    });
};
