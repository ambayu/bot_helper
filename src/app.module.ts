import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BiodataModule } from './biodata/biodata.module';

@Module({
  imports: [UserModule, BiodataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
