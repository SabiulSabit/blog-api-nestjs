import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { BlogController } from './controller/blog.controller';
import { BlogSchema } from './model/blog-entry.entity';
import { BlogService } from './service/blog.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
        // TypeOrm
        AuthModule,
        UserModule,
        BlogModule
    ],
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule { }
