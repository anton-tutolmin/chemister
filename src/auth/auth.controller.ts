import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/user/user.decorators";
import { Users } from "src/user/user.entity";
import { SignUpDto } from "./auth.dto";
import { UserNotExistsPipe } from "./auth.pipe";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UseGuards(AuthGuard('local'))
  signIn(@GetUser() user: Users) {
    return this.authService.signIn(user);
  }

  @Post('sign-up')
  signUp(@Body(UserNotExistsPipe) body: SignUpDto) {
    return this.authService.signUp(body);
  }
}