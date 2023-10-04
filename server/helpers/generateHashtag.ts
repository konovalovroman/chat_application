import { nanoid } from 'nanoid';

export const generateHashtag = (): string => {
    const hashtag = '#' + nanoid(7);
    return hashtag;
};
