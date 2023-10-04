import { compare, genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    return passwordHash;
};

export const comparePasswords = async (
    password: string,
    hash: string,
): Promise<boolean> => {
    const isEqual = await compare(password, hash);
    return isEqual;
};
