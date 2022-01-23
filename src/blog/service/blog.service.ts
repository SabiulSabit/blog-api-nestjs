import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/user.interface';
import { BlogEntry } from '../model/blog-entry.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/service/user.service';
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
    findAll() {
        return this.blogRepository.find();
    }

    //find single user blog posts
    findByUserId(userId: string) {
        return this.blogRepository.find({
            where: {
                author: userId
            }
        })
    }

    //generate a slug
    generateSlug(title: string) {
        return slugify(title)
    }
}
