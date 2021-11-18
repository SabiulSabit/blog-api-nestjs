import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
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

    //update a user
    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateOne(Number(id), user);
    }
}
