import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthDTO {
  export class SignUp {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    password: string;
  }

  export class SignIn {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @Length(8, 20)
    @IsNotEmpty()
    password: string;
  }
}
