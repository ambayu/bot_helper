import { BadRequestException, Body, Controller, Get, Post, Put, Param, Delete } from '@nestjs/common';
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

    @Get(':id')
    find(@Param('id') id: number) {
        return this.userService.findById(id);
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

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.userService.destroy(Number(id))
    }

}
