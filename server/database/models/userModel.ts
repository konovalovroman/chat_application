import { Schema, model } from 'mongoose';
import { User } from '../../core/entities/user';

export const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
    },
    hashtag: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const UserModel = model<User>('User', userSchema);
