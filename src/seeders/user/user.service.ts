import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class UserSeederService {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    const password = await bcrypt.hash('123123', 10);

    const userList = [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        username: 'admin',
        roleName: 'admin',
      },
      {
        name: 'User',
        email: 'user@gmail.com',
        username: 'user',
        roleName: 'user',
      },
      {
        name: 'Guest',
        email: 'guest@gmail.com',
        username: 'guest',
        roleName: 'guest',
      },
      {
        name: 'Admin Laporan',
        email: 'admin_laporan@gmail.com',
        username: 'admin_laporan',
        roleName: 'admin_laporan',
      },
    ];

    for (const userData of userList) {
      // 1. Upsert User
      const user = await this.prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: {
          name: userData.name,
          email: userData.email,
          username: userData.username,
          password,
        },
      });

      // 2. Get Role ID
      const role = await this.prisma.role.findUnique({
        where: { name: userData.roleName },
      });

      if (!role) {
        console.warn(`⚠️ Role "${userData.roleName}" not found, skipping.`);
        continue;
      }

      // 3. Connect User with Role via UserRole if not already exists
      const userRoleExists = await this.prisma.userRole.findFirst({
        where: {
          id_user: user.id,
          id_role: role.id,
        },
      });

      if (!userRoleExists) {
        await this.prisma.userRole.create({
          data: {
            id_user: user.id,
            id_role: role.id,
          },
        });
      }
    }

    console.log('✅ User seeding complete');
  }
}
