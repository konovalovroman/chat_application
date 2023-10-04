import { Schema, model } from 'mongoose';
import { Message } from '../../core/entities/message';

const messageSchema = new Schema<Message>({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    chat: {
        type: Schema.ObjectId,
        ref: 'Chat',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const MessageModel = model<Message>('Message', messageSchema);
