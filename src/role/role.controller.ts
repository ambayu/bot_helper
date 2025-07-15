import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from './role.service';

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
    find(@Param() id: number) {
        return this.roleService.find()
    }

}
