import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        // TypeOrm
        AuthModule,
        UserModule
    ]
})
export class BlogModule { }
