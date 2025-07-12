import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BiodataService {
    constructor(private prisma: PrismaService) { }

    async create(data: createbiodataDto){
        find userId = await this.prisma.biodata.findUnique({
            where:{id}
        })
    }

    async findall() {
        return this.prisma.biodata.findMany();
    }

    async findId(id: number) {
        return this.prisma.biodata.findUnique({
            where: { id }
        });
    }

}
