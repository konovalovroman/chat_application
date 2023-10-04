import { AuthDto } from '../../dto/authDto';
import { JwtToken } from '../types/jwtToken';
import { UserModel } from '../../database/models/userModel';
import { comparePasswords, hashPassword } from '../../helpers/hashPassword';
import { generateHashtag } from '../../helpers/generateHashtag';
import jwt from 'jsonwebtoken';
import { getEnvVariable } from '../../helpers/configService';

export class AuthService {
    async signUp(dto: AuthDto): Promise<JwtToken | null> {
        const { username, password } = dto;
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return null;
        }
        const passwordHash = await hashPassword(password);
        const hashtag = generateHashtag();
        const newUser = await UserModel.create({
            username,
            password: passwordHash,
            hashtag,
        });
        const token = jwt.sign(
            { sub: newUser.id, username, hashtag },
            getEnvVariable('JWT_SECRET'),
        );
        return { accessToken: token };
    }

    async signIn(dto: AuthDto): Promise<JwtToken | null> {
        const { username, password } = dto;
        const user = await UserModel.findOne({ username });
        if (!user) {
            return null;
        }
        const isPasswordMatches = await comparePasswords(
            password,
            user.password,
        );
        if (!isPasswordMatches) {
            return null;
        }
        const token = jwt.sign(
            { sub: user.id, username: user.username, hashtag: user.hashtag },
            getEnvVariable('JWT_SECRET'),
        );
        return { accessToken: token };
    }
}
