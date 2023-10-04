import { AuthService } from '../core/services/authService';
import { UsersService } from '../core/services/usersService';
import { ChatsService } from '../core/services/chatsService';
import { MessagesService } from '../core/services/messagesService';

declare module '@fastify/awilix' {
    interface Cradle {
        authService: AuthService;
        usersService: UsersService;
        chatsService: ChatsService;
        messagesService: MessagesService;
    }
    interface RequestCradle {}
}
