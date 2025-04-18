import { IsNotEmpty, IsString, IsEmail, MinLength} from 'class-validator';

export class CreateAuthDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
}

