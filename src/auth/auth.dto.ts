import { IsEmail, IsString, MinLength } from "class-validator";

export class SignInDto {
  @IsString()
  @MinLength(5)
  username: string;

  @IsString()
  @MinLength(5)
  password: string;
}

export class SignUpDto extends SignInDto {
  @IsString()
  @IsEmail()
  email: string;
}