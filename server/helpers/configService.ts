import { config } from 'dotenv';

config();

export const getEnvVariable = (key: string): string => {
    const variable = process.env[key];
    if (!variable) {
        throw new Error(`Could not read .env variable: ${key}`);
    }
    return variable;
};
