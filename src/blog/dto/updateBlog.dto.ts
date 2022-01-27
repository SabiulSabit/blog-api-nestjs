export interface UpdateBlogDTO {
    title?: string,
    headerImage?: string,
    slug?: string,
    description?: string,
    body?: string,
    likes?: number
    isPublished?: boolean,
}