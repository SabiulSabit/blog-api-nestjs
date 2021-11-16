import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    //create a user
    @Post()
    create(@Body() user: User): Observable<User> {
        return this.userService.create(user);
    }

    //find one user by id
    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
    }

    //find all user
    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll();
    }

    //delete one use
    @Delete(':id')
    deleteOne(@Param() id: string): Observable<User> {
        return this.userService.deleteOne(Number(id));
    }

}
