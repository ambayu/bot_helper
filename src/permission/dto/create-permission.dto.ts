import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {

    @IsNotEmpty({message: "name tidak boleh kosong"})
    name:string
}
