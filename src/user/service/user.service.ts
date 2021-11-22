import { Injectable } from '@nestjs/common';
import { User } from '../models/user.interface';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { UserModule } from '../user.module';

@Injectable()
export class UserService {

    constructor(@InjectModel("User") private readonly userRepository: Model<User>) {

    }
    // create a user
    async create(user: User) {
        const userInfo = new this.userRepository(user);
        let result = await userInfo.save();

        return result;
    }

    //find a user by id
    findOne(id: number) {
        return this.userRepository.findById(id)
    }

    //find all user
    find() {
        return this.userRepository.find();
    }

    //delete one user
    deleteOne(id: string) {

        let userID = Object.values(id)[0];
        this.userRepository.deleteOne({ _id: userID }).exec();
        return;
    }

    //update one user
    async updateOne(id: string, name: string, username: string) {

        const updatedUser = await this.userRepository.findById(id)
        if (name) {
            updatedUser.name = name;
        }
        if (username) {
            updatedUser.username = username;
        }

        updatedUser.save()
        return

    }
}
