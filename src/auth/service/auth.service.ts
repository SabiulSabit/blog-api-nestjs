import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.interface';
const bycrypt = require('bcryptjs');

@Injectable()
export class AuthService {
    // auth service constructor
    constructor(private readonly jwtService: JwtService) { }

    //generate jwt token
    generateJWT(user: User) {
        return this.jwtService.signAsync({ user })
    }

    //hash password
    hashPassword(password: string) {
        let hashValue = bycrypt.hash(password, 13)
        console.log(hashValue);

        return hashValue;
    }

    //compare password
    comparePassword(newPassword: string, passwordHash: string) {
        return bycrypt.compare(newPassword, passwordHash);
    }

}
