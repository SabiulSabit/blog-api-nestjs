import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';


@Module({
  // imports: [
  //   TypeOrmModule.forFeature([UserEntity])
  // ],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
