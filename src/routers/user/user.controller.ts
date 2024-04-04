import { AuthDTO } from 'src/auth/dto/authDto';
import { UserService } from './user.service';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {
    const { email, id, phoneNumber } = authDTO;
    const hasEmail = await this.userService.findByEmail(email);
    if (hasEmail) throw new ConflictException('이미 사용중인 이메일 입니다.');

    const hasId = await this.userService.findById(id);
    if (hasId) {
      throw new ConflictException('이미 사용중인 아이디입니다.');
    }

    const hasPhoneNumber =
      await this.userService.findByPhoneNumber(phoneNumber);
    if (hasPhoneNumber) {
      throw new ConflictException('이미 등록된 전화번호입니다.');
    }

    const userEntity = await this.userService.create(authDTO);
    return '회원가입성공';
  }
}
