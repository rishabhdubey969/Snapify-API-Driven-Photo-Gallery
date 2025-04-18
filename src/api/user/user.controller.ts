import {
  Controller,
  Get,
  Req,
  HttpCode
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller("me")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get specific users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async find(@Req() req: any) {
    return this.userService.findService(req.user.id);
  }

}
