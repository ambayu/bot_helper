import { Module } from '@nestjs/common';
import { BiodataController } from './biodata.controller';
import { BiodataService } from './biodata.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BiodataController],
  providers: [BiodataService]
})
export class BiodataModule { }
