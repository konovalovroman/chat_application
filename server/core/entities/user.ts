export interface UserCreationData {
    id: string;
    username: string;
    hashtag: string;
    password: string;
    createdAt: Date;
}

export class User {
    public id: string;
    public username: string;
    public hashtag: string;
    public createdAt: Date;
    public password: string;

    constructor({
        id,
        username,
        hashtag,
        password,
        createdAt,
    }: UserCreationData) {
        this.id = id;
        this.username = username;
        this.hashtag = hashtag;
        this.password = password;
        this.createdAt = createdAt;
    }
}
