import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { BlogController } from './controller/blog.controller';
import { BlogService } from './service/blog.service';

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
