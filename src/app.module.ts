import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./api/auth/auth.module";
import { ConfigModule } from '@nestjs/config';
import { UserModule } from "./api/user/user.module";
import { PhotoModule } from "./api/photo/photo.module";
import { AdminModule } from "./api/admin/admin.module";
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from '../jwt_security/jwt.const';
import configuration from '../constant/Cloudinary.const';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, UserModule, PhotoModule, AdminModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available app-wide
      load: [configuration]
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER_NAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConst.secret,
      signOptions: { expiresIn: '1h' },
    })
  ],
})
export class AppModule {}
