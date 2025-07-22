import { Body, Controller, Post, Get, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BiodataService } from './biodata.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { createbiodataDto } from './dto/create-biodata.dto';
import { updateBiodataDto } from './dto/update-biodata.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    @UseInterceptors(FileInterceptor('photo', {
        storage: diskStorage({
            destination: './uploads/photos',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            }
        })
    }))
    create(@Body() body: createbiodataDto, @UploadedFile() file: Express.Multer.File) {
        if (file?.filename) {
            body.photo = file.filename;
        }
        return this.biodataService.create(body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.biodataService.destroyed(Number(id));
    }



}
