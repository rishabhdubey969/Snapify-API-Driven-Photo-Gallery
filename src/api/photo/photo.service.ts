import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './entities/photo.entity';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Injectable()
export class PhotoService {

  constructor(
    @InjectModel(Photo)
    private photoModel: typeof Photo,
    private cloudinaryService: CloudinaryService,
  ) {}

  async uploadPhoto(
    file: Express.Multer.File,
    caption: string,
    userId: number,
  ) {
    // Upload image to Cloudinary and handle potential errors
    let cloudinaryResult;
    try {
      cloudinaryResult = await this.cloudinaryService.uploadImage(file, caption);
    } catch (error) {
      throw new Error('Failed to upload image to Cloudinary: ' + error.message);
    }

    // Check if cloudinaryResult is returned successfully
    if (!cloudinaryResult || !cloudinaryResult.url) {
      throw new Error('Failed to get valid Cloudinary result.');
    }

    // Create a new photo record in the database
    const photo = await this.photoModel.create({
      fileName: cloudinaryResult.public_id,
      path: cloudinaryResult.url,
      caption,
      size: file.size,
      userId,
    });

    return photo;
  }

  async getAllPhotos(userId: number, page: number = 1, limit: number = 10) {
    return this.photoModel.findAll({
      where: { userId },
      limit,
      offset: (page - 1) * limit,
    });
  }

  async getPhoto(id: number, userId: number) {
    const photo = await this.photoModel.findOne({ where: { id, userId } });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    return photo;
  }

  async deletePhoto(id: number, userId: number) {
    const photo = await this.photoModel.findOne({ where: { id, userId } });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    if (photo.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this photo');
    }

    await this.cloudinaryService.deleteImage(photo.fileName);
    await photo.destroy();
  }
}
