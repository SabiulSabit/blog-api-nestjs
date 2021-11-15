import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) { }

    // create a user
    creat(user: User): Observable<User> {
        return from(this.userRepository.save(user));
    }

    //find all user
    findAll(): Observable<User[]> {
        return from(this.userRepository.find());
    }

    //delete one user
    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id))
    }

    //update one user
    updateOne(id: number, user: User): Observable<any> {
        return from(this.userRepository.update(id, user))
    }
}
