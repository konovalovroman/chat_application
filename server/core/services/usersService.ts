import { UserModel } from '../../database/models/userModel';
import { User, UserCreationData } from '../entities/user';
import Jwt from 'jsonwebtoken';

export interface IUsersService {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findManyByIds(ids: string[]): Promise<User[] | null>;
    remove(id: string): Promise<User | null>;
}

export class UsersService implements IUsersService {
    async findAll(): Promise<User[]> {
        const users = await UserModel.find();
        const domainUsers: User[] = [];
        for (const user of users) {
            domainUsers.push(this.toDomainUser(user));
        }
        return domainUsers;
    }

    async findById(id: string): Promise<User | null> {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                return null;
            }
            return this.toDomainUser(user);
        } catch (err) {
            return null;
        }
    }

    async findManyByIds(ids: string[]): Promise<User[] | null> {
        try {
            const users = await UserModel.find({
                _id: { $in: ids },
            });
            const domainUsers: User[] = [];
            for (const user of users) {
                domainUsers.push(this.toDomainUser(user));
            }
            return domainUsers;
        } catch (err) {
            return null;
        }
    }

    async remove(id: string): Promise<User | null> {
        try {
            const user = await UserModel.findByIdAndRemove(id);
            if (!user) {
                return null;
            }
            return this.toDomainUser(user);
        } catch (err) {
            return null;
        }
    }

    private toDomainUser(data: UserCreationData): User {
        return new User(data);
    }
}
