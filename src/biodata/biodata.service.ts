import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createbiodataDto } from './dto/create-biodata.dto';
import { errorResponse, successResponse } from 'src/utils/response.util';
import { updateBiodataDto } from './dto/update-biodata.dto';

@Injectable()
export class BiodataService {
    constructor(private prisma: PrismaService) { }

    async create(data: createbiodataDto) {

        const finduserId = await this.prisma.biodata.findUnique({
            where: { id_user: data.id_user }
        })

        if (finduserId) {
            throw new BadRequestException('Biodata User Telah ada')
        }

        const biodata = await this.prisma.biodata.create({
            data: {
                name: data.name,
                alamat: data.alamat,
                tanggal_lahir: data.tanggal_lahir,
                jenis_kelamin: data.jenis_kelamin,
                id_user: data.id_user,
                photo: data.photo
            },
        })

        return {
            statusCode: 201,
            status: "success",
            message: "Biodata Berhasil dibuat",
            data: {
                data: {
                    name: data.name,
                    alamat: data.alamat,
                    tanggal_lahir: data.tanggal_lahir,
                    jenis_kelamin: data.jenis_kelamin,
                    id_user: data.id_user,
                },
            }
        }

    }

    async destroyed(id: number) {

        const data = await this.prisma.biodata.findUnique({
            where: { id },

        });

        if (!data) {
            throw new NotFoundException(errorResponse(`Biodata dengan ID ${id} tidak ditemukan`, 'BIODATA_NOT_FOUND', 404));
        }

        const q = await this.prisma.biodata.delete({
            where: { id }
        })
        return successResponse('Biodata berhasil dihapus', q);
    }

    async findall() {
        const data = await this.prisma.biodata.findMany({
            include: {
                user: true,
            }
        });
        return successResponse('Biodata ditemukan', data);


    }

    async findId(id: number) {
        const data = await this.prisma.biodata.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!data) {
            throw new NotFoundException(errorResponse(`Biodata dengan ID ${id} tidak ditemukan`, 'BIODATA_NOT_FOUND', 404));
        }
        return successResponse('Biodata ditemukan', data);
    }

    async updated(id: number, data: updateBiodataDto) {
        const existing = await this.prisma.biodata.findUnique({
            where: { id_user: id },
        });
        if (!existing) {
            throw new NotFoundException(errorResponse(`Biodata dengan User Id ${id} tidak ditemukan`, 'BIODATA_NOT_FOUND', 404));
        }

        const update = await this.prisma.biodata.update({
            where: { id_user: id },
            data: {
                name: data.name,
                jenis_kelamin: data.jenis_kelamin,
                tanggal_lahir: data.tanggal_lahir,
                alamat: data.alamat,
            }
        })

        return successResponse('Biodata berhasil di perbaharui', update);

    }


}
