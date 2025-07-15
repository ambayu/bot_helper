import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, IsDate } from 'class-validator';

export class createroleDto {

    @IsNotEmpty({ message: "name tidak boleh kosong" })
    name: string;


}