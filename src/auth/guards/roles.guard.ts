import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, @Inject(forwardRef(() => UserService)) private userService: UserService) {
    }

    canActivate(context: ExecutionContext) {
        // get the roles
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        console.log(user.id);


        // if (roles && roles[0] === user.role) {
        //     return true;
        // } else {
        //     console.log(roles, roles[0], user.role);

        //     return false;
        // }


        //have to change this


    }
}