import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { User } from "src/user/models/user.interface";
import { UserService } from "src/user/service/user.service";
import { BlogService } from "../service/blog.service";

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
    constructor(private userService: UserService, private blogService: BlogService) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const user: User = request.user;
        let hasPermission = false;
        let reqUser = await this.userService.findOne(Number(user._id));

        if (reqUser._id === Number(params._id)) {
            hasPermission = true;
        }

        return hasPermission;
    }
}