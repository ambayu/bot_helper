import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class RolePermissionService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateRolePermissionDto) {
    const role = await this.prisma.role.findUnique({ where: { id: data.id_role } });
    const permission = await this.prisma.permission.findUnique({ where: { id: data.id_permission } });

    if (!role) {
      throw new BadRequestException(`Role dengan id ${data.id_role} tidak ditemukan`);
    }

    if (!permission) {
      throw new BadRequestException(`Permission dengan id ${data.id_permission} tidak ditemukan`);
    }

    const q = await this.prisma.rolePermission.create({
      data: {
        id_permission: data.id_permission,
        id_role: data.id_role
      }
    });

    return successResponse("RolePermission berhasil dibuat", q);
  }


  async findAll() {
    const q = await this.prisma.rolePermission.findMany({
      include: { role: true, permission: true }
    })
    return successResponse("Data ditemukan", q);
  }

  async findOne(id: number) {

    const q = await this.prisma.rolePermission.findUnique({
      where: { id },
      include: { role: true, permission: true }
    });
    if (!q) {
      throw new BadRequestException(`Role Permission dengan Id ${id} tidak ditemukan`)
    }
    return successResponse("Data ditemukan", q);
  }

  async update(id: number, data: UpdateRolePermissionDto) {
    const existing = await this.prisma.rolePermission.findUnique({
      where: { id }
    });

    if (!existing) {
      throw new BadRequestException("Role Permission dengan Id " + id + " tidak ditemukan");
    }

    const role = await this.prisma.role.findUnique({ where: { id: data.id_role } });
    const permission = await this.prisma.permission.findUnique({ where: { id: data.id_permission } });

    if (!role) {
      throw new BadRequestException(`Role dengan id ${data.id_role} tidak ditemukan`);
    }

    if (!permission) {
      throw new BadRequestException(`Permission dengan id ${data.id_permission} tidak ditemukan`);
    }

    const q = await this.prisma.rolePermission.update({
      where: { id },
      data: {
        id_role: data.id_role,
        id_permission: data.id_permission
      }
    });

    return successResponse("Role Permission berhasil diperbaharui", q);
  }


  async remove(id: number) {
    const findId = await this.prisma.rolePermission.findUnique({
      where: { id }
    })
    if (!findId) {
      throw new BadRequestException(`ROle Permission dengan Id ${id} tidak ditemukan`)
    }
    const q = await this.prisma.rolePermission.delete({
      where: { id }
    })

    return successResponse("Role Permission berhasil dihapus", q);
  }
}
