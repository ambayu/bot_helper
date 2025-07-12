import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty({ message: "nama tidak boleh kosong" })
    name: string;

    @IsEmail({}, { message: 'email tidak boleh kosong' })
    email: string;

    @IsNotEmpty({ message: 'password tidak boleh kosong' })
    @MinLength(6, { message: 'password minimal 6' })
    password: string;
}