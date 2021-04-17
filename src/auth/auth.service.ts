import { Injectable } from "@nestjs/common";
import { CryptService } from "src/utils/crypt/crypt.service";
import { UsersService } from "src/user/user.service";
import { SignUpDto } from "./auth.dto";
import { Users } from "src/user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { JwtAudiences } from "./auth.constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly cryptService: CryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await this.cryptService.hashPassword(signUpDto.password);
    const user = await this.userService.authorizeUser({...signUpDto, password: hashedPassword});
    const token = await this.createUserToken(user);
    return { token };
  }

  async signIn(user: Users) {
    const token = this.createUserToken(user);
    return { token };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      return null;
    }

    const isValidPassword = await this.cryptService.comparePassword(password, user.password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  async findUserForJwtValidation(userId: Users['id']) {
    return this.userService.findById(userId);
  }

  async createUserToken(user: Users) {
    return this.jwtService.sign({
      sub: user.id,
      aud: JwtAudiences.AUTH,
      email: user.email
    });
  }
}