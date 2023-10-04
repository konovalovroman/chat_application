import { ChatType } from '../types/chatType';
import { User } from './user';

export interface ChatCreationData {
    id: string;
    type: ChatType;
    members: User[];
    createdAt: Date;
}

export class Chat {
    public id: string;
    public type: ChatType;
    public members: User[];
    public createdAt: Date;

    constructor({ id, type, members, createdAt }: ChatCreationData) {
        this.id = id;
        this.type = type;
        this.members = members;
        this.createdAt = createdAt;
    }
}
