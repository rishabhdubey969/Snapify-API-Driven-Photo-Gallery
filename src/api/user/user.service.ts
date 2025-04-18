import { Injectable, NotFoundException, HttpStatus } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from './entities/user.entity';
import { UserConst } from '../../../constant/user.const';

@Injectable()
export class UserService {

  constructor(
      @InjectModel(User)
      private userModel: typeof User,
    ) { }

  async findService(userId) {

    const user =  await this.userModel.findOne({ where: { id:userId } });
    if (!user) {
      throw new NotFoundException(UserConst.USER_NOT_FOUND);
    }

    const getUser = user.toJSON(); // or user.get({ plain: true }) for Sequelize
    // Remove password field
    delete getUser.password;
    // Now use plainUser without password
    return getUser;
 
  }

}
