import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly prisma: PrismaService,) { }

    @Get()
    getall() {
        return this.userService.getall()
    }


    @Post()
    async create(@Body() CreateUserDto: CreateUserDto) {

        const existing = await this.prisma.user.findUnique({
            where: { email: CreateUserDto.email },
        })



        return this.userService.createUser(CreateUserDto);
    }

}
