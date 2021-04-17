import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class UserOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { id, userId } = request.params;

    const paramId = id || userId;

    return paramId === request.user.id;
  }
}