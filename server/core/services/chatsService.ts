import { ChatModel } from '../../database/models/chatModel';
import { Chat, ChatCreationData } from '../entities/chat';
import { ChatType } from '../types/chatType';
import { CreateChatDto } from '../../dto/chatDto';
import { IUsersService } from './usersService';
import { User } from '../entities/user';

export interface IChatsService {
    createPersonalChat(membersIds: string[]): Promise<Chat | null>;
    createGroupChat(membersIds: string[]): Promise<Chat | null>;
    findAll(userId: string): Promise<Chat[]>;
    findById(id: string): Promise<Chat | null>;
}

export class ChatsService implements IChatsService {
    constructor(private readonly usersService: IUsersService) {}

    async createPersonalChat(membersIds: string[]): Promise<Chat | null> {
        try {
            const members = await this.usersService.findManyByIds(membersIds);
            if (!members || membersIds.length !== members?.length) {
                return null;
            }
            const existingChat = await ChatModel.findOne({
                members: membersIds,
                type: 'personal',
            });
            if (existingChat) {
                return null;
            }
            const newChat = await ChatModel.create({
                type: 'personal',
                members: membersIds,
            });
            const domainMembers: User[] = [];
            for (const member of members) {
                domainMembers.push(new User(member));
            }
            return this.toDomainChat({
                id: newChat.id,
                type: newChat.type,
                members: domainMembers,
                createdAt: newChat.createdAt,
            });
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async createGroupChat(membersIds: string[]): Promise<Chat | null> {
        return 'Not implemented yet' as any;
    }

    async findAll(userId: string): Promise<Chat[]> {
        const chats = await ChatModel.find({
            members: userId,
        }).populate('members');
        const domainChats: Chat[] = [];
        for (const chat of chats) {
            const domainMembers: User[] = [];
            for (const member of chat.members) {
                domainMembers.push(new User(member));
            }
            domainChats.push(
                this.toDomainChat({
                    id: chat.id,
                    type: chat.type,
                    members: domainMembers,
                    createdAt: chat.createdAt,
                }),
            );
        }
        return domainChats;
    }

    async findById(id: string): Promise<Chat | null> {
        try {
            const chat = await ChatModel.findById(id).populate('members');
            if (!chat) {
                return null;
            }
            const domainMembers: User[] = [];
            for (const member of chat.members) {
                domainMembers.push(new User(member));
            }
            return this.toDomainChat({
                id: chat.id,
                type: chat.type,
                members: domainMembers,
                createdAt: chat.createdAt,
            });
        } catch (err) {
            return null;
        }
    }

    private toDomainChat(data: ChatCreationData): Chat {
        const chat = new Chat(data);
        return chat;
    }
}
