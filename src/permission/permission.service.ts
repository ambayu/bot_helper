import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { permission } from 'process';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreatePermissionDto) {

    const findName = await this.prisma.permission.findUnique({
      where: { name: data.name }
    })
    if (findName) {
      throw new BadRequestException("Permission dengan nama " + data.name + " sudah ada")
    }

    const q = await this.prisma.permission.create({
      data: {
        name: data.name
      }
    })
    return successResponse("Permission ditemukan", q)

  }

  async findAll() {
    const q = await this.prisma.permission.findMany({
      include: { roles: true }
    });
    return successResponse('Permission ditemukan', q)
  }

  findOne(id: number) {
    const q = this.prisma.permission.findUnique({
      where: { id },
      include: { roles: true }
    })
    return successResponse('Permission ditemukan', q)
  }

  async update(id: number, data: UpdatePermissionDto) {
    const findId = await this.prisma.permission.findUnique({
      where: { id }
    })
    if (!findId) {
      throw new BadRequestException("Permission dengan id " + id + " tidak ditemukan")
    }
    const q = await this.prisma.permission.update({
      where: { id },
      data: {
        name: data.name
      }
    })

    return successResponse("Permission berhasil di perbaharui", q)

  }

  async remove(id: number) {
    const findId = await this.prisma.permission.findUnique({
      where: { id }
    })
    if (!findId) {
      throw new BadRequestException(`Permission dengan Id ${id} tidak ditemukan`)
    }
    const q = await this.prisma.permission.delete({
      where: { id }
    })

    return successResponse("Permission berhasil dihapus", q);
  }
}
