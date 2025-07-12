import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, IsDate } from 'class-validator';
export class createbiodataDto {
    @IsNotEmpty({ message: "nama tidak boleh kosong" })
    name: string;

    @IsNotEmpty({ message: 'alamat tidak boleh kosong' })
    alamat: string;

    @IsNotEmpty({ message: 'tanggal lahir tidak boleh kosong' })
    @IsDate({ message: 'tanggal lahir harus berupa tanggal valid' })
    @Type(() => Date)
    tanggal_lahir: Date;

    @IsNotEmpty({ message: 'jenis kelamin tidak boleh kosong' })
    jenis_kelamin: string;


}