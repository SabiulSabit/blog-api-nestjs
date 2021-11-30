import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    //create a user
    @Post()
    create(@Body() user: User) {
        return this.userService.create(user);
    }

    //find one user by id
    @Get(':id')
    findOne(@Param() params) {
        return this.userService.findOne(params.id);
    }

    //find all user
    @Get()
    findAll() {
        return this.userService.find();
    }

    //delete one use
    @Delete(':id')
    deleteOne(@Param() id: string) {
        return this.userService.deleteOne(id);
    }

    //update a user
    @Put(':id')
    updateOne(@Param('id') id: string, @Body("name") name: string, @Body("username") username: string,  @Body("email") email: string) {
        return this.userService.updateOne(id, name, username, email);
    }
}
