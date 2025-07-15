import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BiodataModule } from './biodata/biodata.module';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, BiodataModule, RoleModule],
  controllers: [AppController, RoleController],
  providers: [AppService, RoleService],
})
export class AppModule {}
