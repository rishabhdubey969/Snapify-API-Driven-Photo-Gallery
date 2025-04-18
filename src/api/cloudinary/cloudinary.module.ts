// src/cloudinary/cloudinary.module.ts

import { Module } from '@nestjs/common';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService],
  exports: [CloudinaryService], // <-- make it available to other modules
})
export class CloudinaryModule {}
