import mongoose from 'mongoose';
import { getEnvVariable } from '../helpers/configService';

export async function connectToDatabase(): Promise<void> {
    await mongoose.connect(getEnvVariable('DATABASE_URL'));
}
