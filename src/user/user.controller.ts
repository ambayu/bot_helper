import { BadRequestException, Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateBiodataDto } from 'src/biodata/dto/update-biodata.dto';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly prisma: PrismaService,) { }

    @Get()
    getall() {
        return this.userService.getall()
    }

    @Put(':id')
    updated(@Param('id') id: number, @Body() data: updateBiodataDto) {
        return this.userService.update(Number(id), data)
    }

    @Post()
    async create(@Body() CreateUserDto: CreateUserDto) {

        const existing = await this.prisma.user.findUnique({
            where: { email: CreateUserDto.email },
        })
        if (existing) {
            throw new BadRequestException('Email sudah terdaftar');
        }


        return this.userService.createUser(CreateUserDto);
    }

}
