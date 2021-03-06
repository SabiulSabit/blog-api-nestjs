import { Injectable } from '@nestjs/common';
import { User, UserRole } from '../models/user.interface';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/service/auth.service';

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
    find(limit: string = "0", username: string = "") {
        let op = username ? { username: username } : {}
        return this.userRepository.find(op).select('-password').limit(parseInt((limit)));
    }

    //delete one user
    deleteOne(id: string) {

        let userID = Object.values(id)[0];
        this.userRepository.deleteOne({ _id: userID }).exec();
        return;
    }

    //update one user
    async updateOne(id: string, name?: string, username?: string, email?: string, profileImage?: string) {

        const updatedUser = await this.userRepository.findById(id).select('-password')

        // console.log(profileImage);

        if (name) {
            updatedUser.name = name;
        }
        if (username) {
            updatedUser.username = username;
        }
        if (email) {
            updatedUser.email = email;
        }
        if (profileImage) {
            updatedUser.profileimage = profileImage;
        }

        updatedUser.save()
        return updatedUser;
    }

    //update user role
    async updateRole(id: string, role: UserRole) {
        const updatedUser = await this.userRepository.findById(id).select('-password');
        updatedUser.role = role;
        updatedUser.save();
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
