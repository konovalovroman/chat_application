import { IChatsService } from './chatsService';
import { IUsersService } from './usersService';

export class MessagesService {
    constructor(
        private readonly usersService: IUsersService,
        private readonly chatsService: IChatsService,
    ) {}
}
