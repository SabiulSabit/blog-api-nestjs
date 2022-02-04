import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/user.interface';
import { BlogEntry } from '../model/blog-entry.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/service/user.service';
import { BlogController } from '../controller/blog.controller';
import { UpdateBlogDTO } from '../dto/updateBlog.dto';
const slugify = require('slugify')

@Injectable()
export class BlogService {

    constructor(@InjectModel("Blog") private readonly blogRepository: Model<BlogEntry>, private userService: UserService) { }

    //create a blog post
    async create(user: User, blogEntry: BlogEntry) {
        blogEntry.author = user;
        blogEntry.slug = this.generateSlug(blogEntry.title);
        const blogInfo = new this.blogRepository(blogEntry);
        let result = await blogInfo.save();
        return result;
    }

    //find all blog post
    async findAll() {
        return await this.blogRepository.find().limit(5).exec((err, tweets) => {

        });
    }

    //find single user blog posts
    async findByUserId(userId: string) {
        return await this.blogRepository.find({
            where: {
                author: userId
            }
        })
    }

    // find specific blog post 
    async findOne(id: string) {
        return await this.blogRepository.findById(id)
    }

    //update a blog post
    async updateOne(id: string, updateBlogData: UpdateBlogDTO) {
        const updatedBlog = await this.blogRepository.findById(id)

        // update data
        updateBlogData.title ? updatedBlog.title = updateBlogData.title : '';
        updateBlogData.body ? updatedBlog.body = updateBlogData.body : '';
        updateBlogData.description ? updatedBlog.description = updateBlogData.description : '';
        updateBlogData.slug ? updatedBlog.description = updateBlogData.slug : '';
        updateBlogData.headerImage ? updatedBlog.headerImage = updateBlogData.headerImage : '';
        updateBlogData.likes ? updatedBlog.likes = updateBlogData.likes : '';
        updateBlogData.isPublished ? updatedBlog.isPublished = updateBlogData.isPublished : '';

        updatedBlog.save();
        return updatedBlog;
    }

    //generate a slug
    generateSlug(title: string) {
        return slugify(title)
    }
}
