import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginAuthDto {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;

}