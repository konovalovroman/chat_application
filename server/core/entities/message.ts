import { Chat } from './chat';
import { User } from './user';

export interface MessageCreationData {
    id: string;
    text: string;
    author: User;
    chat: Chat;
    createdAt: Date;
}

export class Message {
    public id: string;
    public text: string;
    public author: User;
    public chat: Chat;
    public createdAt: Date;

    constructor({ id, text, author, chat, createdAt }: MessageCreationData) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.chat = chat;
        this.createdAt = createdAt;
    }
}
