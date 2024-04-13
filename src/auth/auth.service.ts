import { UserService } from 'src/routers/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from './dto/authDto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async sendVerificationCode(email: string): Promise<void> {
    const code = Math.floor(Math.random() * 10000).toString();
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verification code',
      text: `Your verification code is ${code}`,
    });
    await this.userService.saveVerificationCode(email, code);
  }

  async confirmVerificationCode(email: string, code: string): Promise<boolean> {
    const savedCode = await this.userService.getVerificationCode(email);
    if (code === savedCode) {
      await this.userService.clearVerificationCode(email);
      return true;
    }
    return false;
  }

  async signIn(authDto: AuthDTO.SignIn, user?: any) {
    const { username, password } = authDto;

    const userName = await this.userService.findByUserName(username);
    if (!user) {
      throw new UnauthorizedException('아이디를 확인해주세요.');
    }

    const samePassword = compare(password, user.password);
    if (!samePassword) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
