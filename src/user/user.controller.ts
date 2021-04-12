import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserUpdateDto } from "./user.dto";
import { Users } from "./user.entity";
import { UserOwnerGuard } from "./user.guard";
import { UsersService } from "./user.service";

@Controller('user')
@UseGuards(AuthGuard('jwt'), UserOwnerGuard)
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) {}

  @Get(':id')
  getById(@Param('id') id: Users['id']) {
    return this.userService.findById(id);
  }

  @Put(':id')
  updateById(@Param('id') id: Users['id'], @Body() body: UserUpdateDto) {
    return this.userService.updateById(id, body);
  }

  @Delete(':id')
  deleteById(@Param('id') id: Users['id']) {
    return this.userService.deleteById(id);
  }
}