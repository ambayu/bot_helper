import { Injectable } from '@nestjs/common';
import {  PrismaClient } from '@prisma/client';

@Injectable()
export class RoleSeederService {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    const roles = [
      { name: 'admin' },
      { name: 'admin_laporan' },
      { name: 'user' },
      { name: 'guest' },
    ];

    for (const role of roles) {
      await this.prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: role,
      });
    }

    console.log('✅ Role seeding complete');
  }
}
