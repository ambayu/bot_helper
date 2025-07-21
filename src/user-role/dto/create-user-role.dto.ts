import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserRoleDto {

    @IsNotEmpty({ message: "id user tidak boleh kosong" })
    @IsNumber({}, { message: "id user harus berupa number" })
    id_user: number

    @IsNotEmpty({ message: "id user tidak boleh kosong" })
    @IsNumber({}, { message: "id user harus berupa number" })
    id_role: number
}
