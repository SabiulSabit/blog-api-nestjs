import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
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

    //find all blog post
    @Get()
    findAll(@Query('userId') userId: string) {
        if (userId) {
            return this.blogService.findByUserId(userId)
        } else {
            return this.blogService.findAll();
        }

    }

    // find single blog post
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.blogService.findOne(id);
    }


}
