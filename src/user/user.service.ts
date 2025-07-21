import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { updateBiodataDto } from 'src/biodata/dto/update-biodata.dto';
import { updateUserDto } from './dto/update-user.dto';
import { successResponse } from 'src/utils/response.util';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(data: CreateUserDto) {

        const findmail = await this.prisma.user.findUnique({
            where: { email: data.email }
        })

        if (findmail) {
            throw new BadRequestException('Email sudah digunakan')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                username: data.username
            },
        });

        return {
            statusCode: 201,
            status: 'success',
            message: 'User berhasil dibuat',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt, // pastikan field ini ada di model
            },
        };
    }

    async findById(id: number) {
        const q = await this.prisma.user.findUnique({
            where: { id },
            include: {
                UserRole: {
                    include: {
                        role: {
                            include: {
                                RolePermission: {
                                    include: {
                                        permission: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!q) {
            throw new BadRequestException("User dengan Id " + id + " tidak ditemukan");
        }

        const roles = q.UserRole.map(ur => ur.role.name);
        const permissions = q.UserRole
            .flatMap(ur => ur.role.RolePermission)
            .map(rp => rp.permission.name);
        const uniquePermissions = [...new Set(permissions)];

        return successResponse("Data ditemukan", {
            id: q.id,
            name: q.name,
            email: q.email,
            roles,
            permissions: uniquePermissions,
        });
    }


    async getall() {
        const users = await this.prisma.user.findMany({
            include: {
                UserRole: {
                    include: {
                        role: {
                            include: {
                                RolePermission: {
                                    include: {
                                        permission: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const transformed = users.map(user => {
            const roles = user.UserRole.map(ur => ur.role.name);
            const permissions = user.UserRole
                .flatMap(ur => ur.role.RolePermission)
                .map(rp => rp.permission.name);

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,

                roles: [...new Set(roles)], // hapus duplikat
                permissions: [...new Set(permissions)], // hapus duplikat
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
        });

        return successResponse("User berhasil ditemukan", transformed);
    }


    async update(id: number, data: updateUserDto) {

        const findId = await this.prisma.user.findUnique({
            where: { id }
        })


        if (!findId) {
            throw new BadRequestException('User dengan Id ' + id + ' Tidak Ditemukan')
        }

        if (data.email) {
            const findIdEmail = await this.prisma.user.findUnique({
                where: { email: data.email }
            })
            if (findIdEmail) {
                throw new BadRequestException('User dengan Email ' + data.email + 'Sudah ada')

            }
        }

        const q = await this.prisma.user.update(
            {
                where: { id },
                data: {
                    name: data.name,
                    email: data.email,
                }
            }
        )

        return successResponse("User berhasil diperbaharui", q)

    }

    async destroy(id: number) {
        const findId = await this.prisma.user.findUnique({
            where: { id }
        })

        if (!findId) {
            throw new BadRequestException("User dengan Id " + id + " tidak ditemukan")
        }


        const q = await this.prisma.user.delete({
            where: { id }
        })
        return successResponse("User Berhasil Dihapus", q)
    }



}
