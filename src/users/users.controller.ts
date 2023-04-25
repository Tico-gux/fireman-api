import { UserService } from './users.service'
import { Body, Controller, Param, Request, Put, ParseIntPipe, UseGuards } from '@nestjs/common'
import { Get, Delete, Headers, Post, Patch } from '@nestjs/common/decorators'
import { CreateUserDto, RespUsersDto, UpdateUserDto } from './users.dto'
import { LocalAuthGuard } from 'src/auth/local-auth.guard'
import { AuthenticatedGuard } from 'src/auth/authenticated.guard'

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthenticatedGuard)
    @Get()
    findAll(@Headers() headers) {
        return this.userService.findAll()
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        return await req.user
    }

    @Post()
    async create(@Body() newUser: CreateUserDto) {
        return await this.userService.create(newUser)
    }

    // @Get('/login')
    // async login(@Headers('user') email:string, password:string): Promise <RespUsersDto>{
    //     return new Promise<RespUsersDto>(async (resolve, reject) => {
    //     try {

    //     } catch (error) {

    //     }
    //     })

    // }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        //parse transforma id en int porque sino typeorme lo toma como string pero entiende que es numero
        return this.userService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.userService.update(user, id)
    } // se manda el id por el url y en el body el json de {"email":"aasdasd", "password":"asdasd"}
}
