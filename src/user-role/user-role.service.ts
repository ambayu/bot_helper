import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) { }

  async create(body: CreateUserRoleDto) {

    const user = await this.prisma.user.findUnique({
      where: { id: body.id_user }
    });

    const role = await this.prisma.role.findUnique({
      where: { id: body.id_role }
    });

    if (!user) {
      throw new BadRequestException('User  dengan Id ' + body.id_user + " tidak ditemukan")
    }
    if (!role) {
      throw new BadRequestException('Role dengan Id ' + body.id_role + " tidak ditemukan")
    }


    const q = await this.prisma.userRole.create({
      data: {
        id_role: body.id_role,
        id_user: body.id_user
      }
    });

    return successResponse("User Role berhasil ditambahkan", q)

  }

  async findAll() {
    const q = await this.prisma.userRole.findMany(
      {
        include: {
          user: true,
          role: true,
        }
      }
    );
    return successResponse('User Role ditemukan', q)
  }

  async findOne(id: number) {
    const q = await this.prisma.userRole.findUnique({
      where: { id }
    })
    if (!q) {
      throw new BadRequestException('User Role dengan Id' + id + " tidak ditemukan")

    }
    return successResponse('User Role ditemukan', q)
  }

  async update(id: number, body: UpdateUserRoleDto) {
    const findId = await this.prisma.userRole.findUnique({
      where: { id }
    })

    if (!findId) {
      throw new BadRequestException('User Role dengan Id ' + id + " tidak ditemukan")
    }

    const q = await this.prisma.userRole.update({
      where: { id },
      data: {
        id_role: body.id_role,
        id_user: body.id_user
      }
    });

    return successResponse("User Role berhasil ditambahkan", q);
  }

  async remove(id: number) {
    const findId = await this.prisma.userRole.findUnique({
      where: { id }
    });

    if (!findId) {
      throw new BadRequestException('User Role dengan Id ' + id + " tidak ditemukan")
    }

    const q = await this.prisma.userRole.delete({
      where: { id }
    })
    return successResponse('User Role berhasil dihapus', q);
  }



}
