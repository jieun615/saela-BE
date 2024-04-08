import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/routers/user/user.service';
import { AuthDTO } from './dto/authDto';
import * as bcrypt from 'bcrypt';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {
    const { email, username } = authDTO;

    const isEmail = await email.match(
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g,
    );
    if (!isEmail) {
      throw new ConflictException('이메일 형식에 맞지 않습니다.');
    }

    const hasEmail = await this.userService.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    const isUserName = await username.match(/^[a-z0-9_-]{1,10}$/g);
    if (!isUserName) {
      throw new ConflictException('아이디 형식에 맞지 않습니다.');
    }

    const hasUserName = await this.userService.findByUserName(username);
    if (hasUserName) {
      throw new ConflictException('이미 사용중인 아이디입니다.');
    }

    const isPassword = await authDTO.password.match(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/g,
    );
    if (!isPassword) {
      throw new ConflictException('비밀번호 형식에 맞지 않습니다.');
    }

    const userEntity = await this.userService.create(authDTO);
    return '회원가입성공';
  }

  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { username, password } = authDTO;

    const user = await this.userService.findByUserName(username);
    if (!user) {
      throw new UnauthorizedException('아이디를 확인해주세요.');
    }

    const samePassword = bcrypt.compare(password, user.password);
    if (!samePassword) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    return '로그인 완료';
  }
}
