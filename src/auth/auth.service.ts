import { UserService } from 'src/routers/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from './dto/authDto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDTO.SignIn) {
    const { username, password } = authDto;

    const user = await this.userService.findByUserName(username);
    if (!user) {
      throw new UnauthorizedException('아이디를 확인해주세요.');
    }

    const samePassword = compare(password, user.password);
    if (!samePassword) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { id: user.id };

    return this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
    });
  }
}
