import { Injectable } from '@nestjs/common';
import { User } from '../models/user.interface';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { UserModule } from '../user.module';
import { AuthService } from 'src/auth/service/auth.service';
import { switchMap } from 'rxjs';

@Injectable()
export class UserService {

    constructor(@InjectModel("User") private readonly userRepository: Model<User>, private authService: AuthService) {

    }
    // create a user
    async create(user: User) {

        const hashPassword = await this.authService.hashPassword(user.password)
        user.password = String(hashPassword)

        const userInfo = new this.userRepository(user);
        let result = await userInfo.save();
        let filterUser = result.toObject();
        delete filterUser.password;

        return filterUser;
    }


    //find a user by id
    findOne(id: number) {
        return this.userRepository.findById(id).select('-password')
    }

    //find all user
    find() {
        return this.userRepository.find().select('-password');
    }

    //delete one user
    deleteOne(id: string) {

        let userID = Object.values(id)[0];
        this.userRepository.deleteOne({ _id: userID }).exec();
        return;
    }

    //update one user
    async updateOne(id: string, name: string, username: string, email: string) {

        const updatedUser = await this.userRepository.findById(id).select('-password')
        if (name) {
            updatedUser.name = name;
        }
        if (username) {
            updatedUser.username = username;
        }
        if (email) {
            updatedUser.email = email;
        }

        updatedUser.save()
        return updatedUser;
    }

    //user login
    async login(user: User) {
        let result = await this.validateUser(user.email, user.password)
        if (result) {
            return this.authService.generateJWT(result);
        } else {
            return { error: "Unauthorized!!" }
        }
    }

    // check valid user
    async validateUser(email: string, password: string) {
        let user = await this.findByMail(email)

        let match = await this.authService.comparePassword(password, user.password);
        if (match) {
            let filterUser = user.toObject();
            delete filterUser.password;
            return filterUser
        } else {
            return null
        }

    }

    //find user by email
    findByMail(email: string) {
        return this.userRepository.findOne({ email })
    }

}
