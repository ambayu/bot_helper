import { PartialType } from '@nestjs/mapped-types';
import { createroleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(createroleDto) { }
