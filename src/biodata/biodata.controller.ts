import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { BiodataService } from './biodata.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { createbiodataDto } from './dto/create-biodata.dto';
import { updateBiodataDto } from './dto/update-biodata.dto';

@Controller('biodata')
export class BiodataController {

    constructor(
        private readonly biodataService: BiodataService,
        private readonly prisma: PrismaService,) { }


    @Get()
    getall() {
        return this.biodataService.findall();
    }

    @Get(':id')
    findId(@Param('id') id: number) {
        return this.biodataService.findId(Number(id));
    }

    @Put(":id")
    update(@Param('id') id: number, @Body() body: updateBiodataDto) {
        return this.biodataService.updated(Number(id), body);
    }

    @Post()
    create(@Body() body: createbiodataDto) {
        return this.biodataService.create(body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.biodataService.destroyed(Number(id));
    }



}
