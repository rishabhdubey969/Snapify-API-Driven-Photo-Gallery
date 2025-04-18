import { Logger, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, Logger],
})
export class AuthModule {}
