import { Body, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AddElementsDto, RemoveElementsDto } from "./list.dto";
import { Lists } from "./list.entity";
import { ListOwnerGuard } from "./list.guard";
import { ListsService } from "./list.service";

@Controller('list')
@UseGuards(AuthGuard('jwt'))
export class ListsController {
  constructor(
    private readonly listService: ListsService
  ) {}

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