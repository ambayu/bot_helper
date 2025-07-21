import { IsNotEmpty } from "class-validator";

export class CreateRolePermissionDto {
    @IsNotEmpty({ message: "id role tidak boleh kosong" })
    id_role: number
    @IsNotEmpty({ message: "id permission tidak boleh kosong" })
    id_permission: number

}
