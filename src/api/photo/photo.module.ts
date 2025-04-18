import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { PhotoController } from "./photo.controller";
import { Photo } from './entities/photo.entity';
import { User } from '../user/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { AuthMiddleware } from '../../middleware/auth.middleware';


@Module({
  controllers: [PhotoController],
  providers: [PhotoService],
  imports: [SequelizeModule.forFeature([Photo, User]),  ConfigModule, CloudinaryModule],
})
export class PhotoModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PhotoController);
}}
