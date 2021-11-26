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

        console.log("Here: ", password);

        let a = bycrypt.hashSync(password, 13);
        console.log(a);

        return bycrypt.hash(password, 13)
    }

    //compare password
    comparePassword(newPassword: string, passwordHash: string) {
        return bycrypt.compare(newPassword, passwordHash);
    }

}
