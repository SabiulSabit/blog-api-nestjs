import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, @Inject(forwardRef(() => UserService)) private userService: UserService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        // get the roles
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return true;

    }
}