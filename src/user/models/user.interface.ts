import { BlogEntry } from "src/blog/model/blog-entry.interface";

export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    profileimage: string;
    blogEntries?: BlogEntry[]
}

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    USER = 'user'
}