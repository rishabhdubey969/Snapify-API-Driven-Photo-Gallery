import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, 
  Req,
  UseInterceptors, 
  UploadedFile,
  Query
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PhotoService } from "./photo.service";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { PhotoPaginationDto } from './dto/pagination.dto';




@Controller("photos")
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('photo'))
  upload( @UploadedFile() file: Express.Multer.File,
  @Body('caption') caption: string,
  @Req() req: any,) {
    return this.photoService.uploadPhoto(file, caption, req.user.id);
  }

  @Get()
  async getPhotos(@Query('page') page: number, @Query('limit') limit: number, @Req() req: any) {
    return this.photoService.getAllPhotos(req.user.id, page, limit);
  }

  @Get(':id')
  async getPhoto(@Param('id') id: number, @Req() req: any) {
    console.log(id);
    return this.photoService.getPhoto(id, req.user.id);
  }

  @Delete(':id')
  async deletePhoto(@Param('id') id: number, @Req() req: any) {
    return this.photoService.deletePhoto(id, req.user.id);
  }
}
