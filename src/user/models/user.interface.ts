
export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    profileimage: string;
}

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    USER = 'user'
}