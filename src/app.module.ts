import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BiodataModule } from './biodata/biodata.module';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user-role/user-role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './seeders/user/user.service';
import { RoleService } from './seeders/role/role.service';
import { PermissionService } from './seeders/permission/permission.service';

@Module({
  imports: [UserModule, BiodataModule, RoleModule, UserRoleModule, PermissionModule, RolePermissionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UserService, RoleService, PermissionService],
})

export class AppModule { }
