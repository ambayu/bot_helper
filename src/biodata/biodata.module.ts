import { Module } from '@nestjs/common';
import { BiodataController } from './biodata.controller';
import { BiodataService } from './biodata.service';

@Module({
  controllers: [BiodataController],
  providers: [BiodataService]
})
export class BiodataModule {}
