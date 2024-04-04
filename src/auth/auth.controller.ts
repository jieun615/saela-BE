import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/routers/user/user.service';
import { AuthDTO } from './dto/authDto';
import * as bcrypt from 'bcrypt';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { id, password } = authDTO;

    const user = await this.userService.findById(id);
    console.log(user);
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
