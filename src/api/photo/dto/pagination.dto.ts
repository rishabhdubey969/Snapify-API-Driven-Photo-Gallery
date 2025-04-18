import { IsOptional, IsNumberString } from 'class-validator';

export class PhotoPaginationDto {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  limit: number;
}