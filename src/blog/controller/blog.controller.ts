import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { create } from 'domain';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { BlogEntry } from '../model/blog-entry.interface';
import { BlogService } from '../service/blog.service';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {
    }

    //create a post
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() blog: BlogEntry, @Request() req) {
        const user = req.user.user;
        return this.blogService.create(user, blog)
    }
}
