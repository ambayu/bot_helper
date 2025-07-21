import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, IsDate, isString } from 'class-validator';

export class createroleDto {

    @IsNotEmpty({ message: "name tidak boleh kosong" })
    
    name: string;


}