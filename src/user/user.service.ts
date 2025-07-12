import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


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
        return this.prisma.user.findUnique({
            where: { id }
        })
    }

    async getall() {
        return this.prisma.user.findMany();
    }

}
