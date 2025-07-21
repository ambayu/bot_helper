import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from './role.service';
import { createroleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly roleService: RoleService
    ) { }


    @Get()
    findAll() {
        return this.roleService.findAll()
    }

    @Get(':id')
    find(@Param('id') id: number) {
        return this.roleService.find(id)
    }

    @Post()
    create(@Body() body: createroleDto) {
        return this.roleService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: UpdateRoleDto) {
        return this.roleService.update(id, data);
    }


}
