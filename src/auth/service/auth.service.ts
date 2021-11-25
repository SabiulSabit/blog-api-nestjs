import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    // auth service constructor
    constructor(private readonly jwtService: JwtService) { }
}
