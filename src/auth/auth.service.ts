import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/user-role/entities/user-role.entity';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async login(username: string, password: string) {
        if (!username) {
            throw new Error('Username is required');
        }

        if (!password) {
            throw new Error('Password is required');
        }

        const user = await this.prisma.user.findUnique({
            where: { username },
            include: {
                UserRole: {
                    include: {
                        role: {
                            include: {
                                RolePermission: {
                                    include: { permission: true },
                                },
                            },
                        },
                    },
                },
                Biodata: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('Username tidak ditemukan');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Password salah');
        }

        // Ambil nama role dari relasi
        const roles = user.UserRole.map((ur) => ur.role.name);

        // Ambil semua permission dari semua role yang dimiliki user (flatten)
        const permissions = user.UserRole.flatMap((ur) =>
            ur.role.RolePermission.map((rp) => rp.permission.name)
        );

        const payload = {
            sub: user.id,
            username: user.username,
            roles,
        };

        const token = this.jwtService.sign(payload);

        return successResponse('Login berhasil', {
            token,
            user: {
                id: user.id,
                email: user.email,
                roles,
                permissions,
                biodata: user.Biodata,
            },
        });
    }
}
