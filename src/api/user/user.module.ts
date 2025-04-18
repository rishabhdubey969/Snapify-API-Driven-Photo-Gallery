import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { AuthMiddleware } from '../../middleware/auth.middleware';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
}}