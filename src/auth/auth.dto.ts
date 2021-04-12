export class SignInDto {
  username: string;
  password: string;
}

export class SignUpDto extends SignInDto {
  email: string;
}