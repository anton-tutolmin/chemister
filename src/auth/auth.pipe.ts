import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { UsersService } from "src/user/user.service";
import { SignUpDto } from "./auth.dto";

@Injectable()
export class UserNotExistsPipe implements PipeTransform {
  constructor(
    private readonly usersService: UsersService
  ) {}

  async transform(value: SignUpDto, metadata: ArgumentMetadata) {
    const user = await this.usersService.findByEmail(value.email);

    if (user) {
      throw new BadRequestException('User is authorized already.');
    }

    return value;
  }
}