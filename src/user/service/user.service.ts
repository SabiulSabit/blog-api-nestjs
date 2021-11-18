import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { UserModule } from '../user.module';

@Injectable()
export class UserService {

    // constructor(
    //     @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    // ) { }

    constructor(@InjectModel("User") private readonly userRepository: Model<User>) {

    }
    // create a user : Observable<Any> 
    async create(user: User) {
        const userInfo = new this.userRepository(user);
        let result = await userInfo.save();
        console.log(result);

        // return from(this.userRepository.save(user));
    }

    //find a user by id
    // findOne(id: number): Observable<User> {
    //     return from(this.userRepository.findOne({ id }))
    // }

    //find all user
    // findAll(): Observable<User[]> {
    //     return from(this.userRepository.find());
    // }

    //delete one user
    // deleteOne(id: number): Observable<any> {
    //     return from(this.userRepository.delete(id))
    // }

    //update one user
    // updateOne(id: number, user: User): Observable<any> {
    //     return from(this.userRepository.update(id, user))
    // }
}
