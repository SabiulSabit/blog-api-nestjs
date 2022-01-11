import { User } from "src/user/models/user.interface";

export interface BlogEntry {
    title: string,
    headerImage: string,
    slug: string,
    description: string,
    body: string,
    likes: number
    author: User,
    isPublished: boolean,
}