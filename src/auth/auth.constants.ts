import { JwtModuleOptions } from "@nestjs/jwt";
import { ExtractJwt, StrategyOptions } from "passport-jwt";
import { JWT_SECRET } from "src/constants";

export const JwtOptions: JwtModuleOptions = {
  secret: JWT_SECRET,
  signOptions: {
    expiresIn: `${60 * 60 * 24}s`
  }
}

export const PassportJwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: JWT_SECRET,
}

export enum JwtAudiences {
  AUTH = 'AUTH',
}