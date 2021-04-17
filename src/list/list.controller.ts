import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/user/user.decorators";
import { AddElementsDto, CreateListDto, RemoveElementsDto } from "./list.dto";
import { Lists } from "./list.entity";
import { ListOwnerGuard } from "./list.guard";
import { ListsService } from "./list.service";

@UseGuards(AuthGuard('jwt'))
@Controller('list')
export class ListsController {
  constructor(
    private readonly listService: ListsService
  ) {}

  @Post()
  create(@GetUser() user, @Body() body: CreateListDto) {
    return this.listService.create(user.id, body);
  }

  @Put(':id/add_elements')
  @UseGuards(ListOwnerGuard)
  addElement(@Param('id') id: Lists['id'], @Body() body: AddElementsDto) {
    return this.listService.addElements(id, body);
  }

  @Put(':id/remove_elemnts')
  @UseGuards(ListOwnerGuard)
  removeElements(@Param('id') id: Lists['id'], @Body() body: RemoveElementsDto) {
    return this.listService.removeElements(id, body);
  }

}