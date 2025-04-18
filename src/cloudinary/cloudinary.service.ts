// src/cloudinary/cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

async uploadImage(file: Express.Multer.File, caption: string) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'photos',
        public_id: file.originalname,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(new Error('Upload failed with unknown error.'));
        }

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          caption,
          width: result.width,
          height: result.height,
        });
      },
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
}

  async deleteImage(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
  }
}
