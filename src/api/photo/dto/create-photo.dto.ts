import { IsString } from 'class-validator';

export class CreatePhotoDto {
    @IsString()
    caption: string;
}
