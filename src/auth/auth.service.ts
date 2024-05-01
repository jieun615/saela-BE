import { UserService } from 'src/routers/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from './dto/authDto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(authDto: AuthDTO.SignIn) {
    const { username, password } = authDto;

    const userName = await this.userService.findByUserName(username);
    if (!userName) {
      throw new UnauthorizedException('아이디를 확인해주세요.');
    }

    const samePassword = compare(password, userName.password);
    if (!samePassword) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    return '로그인 완료';
  }
}
