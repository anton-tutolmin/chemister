import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ListsService } from "./list.service";

@Injectable()
export class ListOwnerGuard implements CanActivate {
  constructor(
    private readonly listService: ListsService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const { id } = request.params;

    const list = await this.listService.findById(id);

    if (!list) {
      throw new BadRequestException('List not exists.');
    }
    
    return list.userId !== user.id;
  }
}