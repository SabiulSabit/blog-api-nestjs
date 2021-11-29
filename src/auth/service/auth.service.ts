import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.interface';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
    // auth service constructor
    constructor(private readonly jwtService: JwtService) { }

    //generate jwt token
    generateJWT(user: User) {
        return this.jwtService.signAsync({ user })
    }

    //hash password
    async hashPassword(password: string) {


        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 13, function(err, hash) {
              if (err) reject(err)
              resolve(hash)
            });
          })

          
       
            return hashedPassword;
        
       
        
    }

    //compare password
    comparePassword(newPassword: string, passwordHash: string) {
        return bcrypt.compare(newPassword, passwordHash);
    }

}
