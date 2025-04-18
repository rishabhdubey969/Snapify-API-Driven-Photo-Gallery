import { Module, Logger } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { User } from '../user/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from  '../photo/entities/photo.entity' 

@Module({
  controllers: [AdminController],
  providers: [AdminService, Logger],
  imports: [SequelizeModule.forFeature([User, Photo])],
})
export class AdminModule {}
