import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class UserOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    return id === request.user.id;
  }
}