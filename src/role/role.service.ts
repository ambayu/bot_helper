import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { errorResponse, successResponse } from 'src/utils/response.util';
import { createroleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        const roles = await this.prisma.role.findMany({
            include: {
                RolePermission: {
                    include: { permission: true },
                },
                users: {
                    include: {
                        user: {
                            include: {
                                Biodata: true,
                            },
                        },
                    },
                },
            },
        });
        const data = roles.map((role) => ({
            id: role.id,
            name: role.name,
            users: role.users.map((u) => ({
                id_user: u.user.id,
                email: u.user.email,
                biodata: u.user.Biodata,
            })),
            permission: role.RolePermission.map((rp) => rp.permission),
        }));

        return successResponse('Data ditemukan', data);
    }

    async find(id: number) {

        const role = await this.prisma.role.findUnique({
            where: { id },
            include: {
                RolePermission: {
                    include: { role: true, permission: true, }
                },
                users: {
                    include: {
                        user: {
                            include: {
                                Biodata: true
                            }
                        }
                    }
                }
            }
        });

        if (!role) {
            throw new NotFoundException(
                errorResponse(`Role dengan ID ${id} tidak ditemukan`, 'ROLE_NOT_FOUND', 404),
            );
        }

        const data = {
            id: role.id,
            name: role.name,
            users: role.users.map(u => ({
                id_user: u.user.id,
                email: u.user.email,
                biodata: u.user.Biodata,
            })),
            permission: role.RolePermission.map(rp => rp.permission),
        };

        return successResponse('Role ditemukan', data);
    }

    async create({ name }: createroleDto) {
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

    async update(id: number, data: UpdateRoleDto) {
        const findId = await this.prisma.role.findUnique({
            where: { id }
        })

        if (!findId) {
            throw new BadRequestException('Role dengan Id ' + id + ' Tidak Ditemukan')
        }

        const q = await this.prisma.role.update(
            {
                where: { id },
                data: {
                    name: data.name
                }
            }

        )
        return successResponse("Role berhasil diperbaharui", q);

    }

    async delete(id: number) {
        const deleted = await this.prisma.role.delete({
            where: { id },
        });

        return successResponse('Role berhasil dihapus', deleted);
    }


}
