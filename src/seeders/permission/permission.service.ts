import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PermissionSeederService {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    try {
      const rolePermissionsMap = {
        admin: [
          'user:create',
          'user:edit',
          'user:delete',
          'user:view',
          'laporan:view',
          'laporan:edit',
          'laporan:delete',
        ],
        admin_laporan: ['laporan:view', 'laporan:edit', 'laporan:delete'],
        user: ['user:view', 'laporan:view'],
        guest: ['laporan:view'],
      };

      // 1. Ambil semua permission unik
      const allPermissionNames = [
        ...new Set(Object.values(rolePermissionsMap).flat()),
      ];

      // 2. Insert semua permission secara paralel
      await Promise.all(
        allPermissionNames.map((name) =>
          this.prisma.permission.upsert({
            where: { name },
            update: {},
            create: { name },
          }),
        ),
      );
      console.log('✅ Semua permission berhasil dimasukkan atau sudah ada');

      // 3. Ambil role dan permission dari DB
      const [rolesInDB, permissionsInDB] = await Promise.all([
        this.prisma.role.findMany(),
        this.prisma.permission.findMany(),
      ]);

      const roleMap = Object.fromEntries(rolesInDB.map((r) => [r.name, r]));
      const permissionMap = Object.fromEntries(
        permissionsInDB.map((p) => [p.name, p]),
      );

      // 4. Assign permission ke masing-masing role
      for (const [roleName, permissionNames] of Object.entries(
        rolePermissionsMap,
      )) {
        const role = roleMap[roleName];

        if (!role) {
          console.warn(`❗ Role "${roleName}" tidak ditemukan di database`);
          continue;
        }

        for (const permissionName of permissionNames) {
          const permission = permissionMap[permissionName];

          if (!permission) {
            console.warn(`❗ Permission "${permissionName}" tidak ditemukan`);
            continue;
          }

          const existing = await this.prisma.rolePermission.findFirst({
            where: {
              id_role: role.id,
              id_permission: permission.id,
            },
          });

          if (!existing) {
            await this.prisma.rolePermission.create({
              data: {
                id_role: role.id,
                id_permission: permission.id,
              },
            });
            console.log(
              `✅ Permission "${permissionName}" ditambahkan ke role "${roleName}"`,
            );
          } else {
            console.log(
              `ℹ️ Permission "${permissionName}" sudah terhubung dengan role "${roleName}"`,
            );
          }
        }
      }

      console.log('🎉 Proses seeding permission selesai');
    } catch (error) {
      console.error('❌ Terjadi kesalahan saat seeding permission:', error);
    }
  }
}
