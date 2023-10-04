import { Schema, model } from 'mongoose';
import { Chat } from '../../core/entities/chat';

const chatSchema = new Schema<Chat>({
    type: {
        type: String,
        enum: ['personal', 'group'],
        required: true,
    },
    members: [
        {
            type: Schema.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const ChatModel = model<Chat>('Chat', chatSchema);
