import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { errorResponse, successResponse } from 'src/utils/response.util';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        const q = await this.prisma.role.findMany();
        return successResponse("Role Ditemukan", q);
    }

    async find(id: number) {
        const role = await this.prisma.role.findUnique({
            where: { id },
        });

        if (!role) {
            throw new NotFoundException(
                errorResponse(`Role dengan ID ${id} tidak ditemukan`, 'ROLE_NOT_FOUND', 404),
            );
        }

        return successResponse('Role ditemukan', role);
    }

    async create(name: string) {
        const exists = await this.prisma.role.findUnique({
            where: { name },
        });

        if (exists) {
            throw new NotFoundException(errorResponse(`Role ${name} sudah ada`, 'ROLE_EXISTS', 400));
        }

        const created = await this.prisma.role.create({
            data: { name },
        });

        return successResponse('Role berhasil dibuat', created);
    }

    async delete(id: number) {
        const deleted = await this.prisma.role.delete({
            where: { id },
        });

        return successResponse('Role berhasil dihapus', deleted);
    }

}
