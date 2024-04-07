import { AuthDTO } from 'src/auth/dto/authDto';
import { UserService } from './user.service';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {
    const { email, id, phoneNumber } = authDTO;

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

    const isId = await id.match(/^[a-z0-9_-]{1,10}$/g);
    if (!isId) {
      throw new ConflictException('아이디 형식에 맞지 않습니다.');
    }

    const hasId = await this.userService.findById(id);
    if (hasId) {
      throw new ConflictException('이미 사용중인 아이디입니다.');
    }

    const isPhoneNumber = await phoneNumber.match(
      /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/g,
    );
    if (!isPhoneNumber) {
      throw new ConflictException('전화번호 형식에 맞지 않습니다.');
    }

    const hasPhoneNumber =
      await this.userService.findByPhoneNumber(phoneNumber);
    if (hasPhoneNumber) {
      throw new ConflictException('이미 등록된 전화번호입니다.');
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
}
