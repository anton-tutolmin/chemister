import { IsAlpha, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UserCreateDto {
  @IsString()
  @IsAlpha()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsEmail()
  @MinLength(10)
  email: string;
}

export class UserUpdateDto {
  @IsString()
  @IsAlpha()
  @MinLength(6)
  @IsOptional()
  username: string;
}