import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';

@Module({
    imports: [
        // TypeOrm
        AuthModule,
        UserModule
    ],
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule { }
