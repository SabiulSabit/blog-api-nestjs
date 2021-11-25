import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.interface';

@Injectable()
export class AuthService {
    // auth service constructor
    constructor(private readonly jwtService: JwtService) { }

    //generate jwt token
    generateJWT(user: User) {
        return this.jwtService.signAsync({ user })
    }
}
