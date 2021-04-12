import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt';
import { PassportJwtOptions } from "../auth.constants";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(PassportJwtOptions);
  }

  async validate(payload: any) {
    const user = this.authService.findUserForJwtValidation(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User was deleted.');
    }

    return user;
  }
}