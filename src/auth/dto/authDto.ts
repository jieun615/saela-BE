import { IsEmail, IsString, Length } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthDTO {
  export class SignUp {
    @IsString()
    id: string;

    @IsEmail()
    email: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    @Length(8, 20)
    password: string;
  }

  export class SignIn {
    @IsString()
    id: string;

    @IsString()
    @Length(8, 20)
    password: string;
  }
}
