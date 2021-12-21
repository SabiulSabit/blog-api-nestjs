import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User, UserRole } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    //create a user
    @Post()
    create(@Body() user: User) {
        return this.userService.create(user);
    }

    //login
    @Post('login')
    login(@Body() user: User) {
        let result = this.userService.login(user);
        return result;
    }


    //find one user by id
    @Get(':id')
    findOne(@Param() params) {
        return this.userService.findOne(params.id);
    }

    //find all user
    @hasRoles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll(@Param('limit') limit: string, @Query('username') username: string) {
        return this.userService.find(limit, username);
    }


    //delete one use
    @Delete(':id')
    deleteOne(@Param() id: string) {
        return this.userService.deleteOne(id);
    }

    //update a user
    @Put(':id')
    updateOne(@Param('id') id: string, @Body("name") name: string, @Body("username") username: string, @Body("email") email: string) {
        return this.userService.updateOne(id, name, username, email);
    }
    
    //update user role 
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateUserRole(@Param('id') id: string, @Body("role") role: UserRole){
        return this.userService.updateRole(id, role)
    }
}
