import { Injectable, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthDto } from "./dto/create-auth.dto";
import { User } from '../user/entities/user.entity';
import { Auth } from '../../../constant/auth.const';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
    private readonly logger: Logger,
  ) { }

  async register(createAuthDto: CreateAuthDto) {
    const { email, password, name } = createAuthDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ where: { email } });

    if (existingUser) {
      throw new HttpException(Auth.EmailExist, HttpStatus.BAD_REQUEST);
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = await this.userModel.create({
      ...createAuthDto,
      password: hashedPassword
    });

    // Optionally, you can remove password from the response for security reasons
    const { password: _, ...userWithoutPassword } = newUser.get();

    this.logger.log(`User created successfully - ${email}`, name);

    return userWithoutPassword;
  }

  async signIn(LoginAuthDto: LoginAuthDto) {
  
    const { email, password } = LoginAuthDto;
    const existingAuthenticationLogin = await this.userModel.findOne({ where: { email } });
  
    if (!existingAuthenticationLogin) {
      throw new HttpException(Auth.EMAIL_NOT_FOUND, HttpStatus.FORBIDDEN);
    }

    const comparePassword = existingAuthenticationLogin.get('password');
    const isPasswordValid = await bcrypt.compare(password, comparePassword);


    if (!isPasswordValid) {
      throw new HttpException(Auth.PASSWORD_NOT_FOUND, HttpStatus.FORBIDDEN);
    }

    const payload = { id: existingAuthenticationLogin.id, email: existingAuthenticationLogin.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
 
  }

}
