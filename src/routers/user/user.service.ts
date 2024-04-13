import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO } from 'src/auth/dto/authDto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(authDTO: AuthDTO.SignUp) {
    const userEntity = await this.userRepository.create(authDTO);
    return await this.userRepository.save(userEntity);
  }

  async saveVerificationCode(email: string, code: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (user) {
      user.verificationCode = code;
    } else {
      const newUser = new User();
      newUser.email = email;
      newUser.verificationCode = code;
      this.userRepository.create(newUser);
    }
  }

  async getVerificationCode(email: string): Promise<string | undefined> {
    const user = await this.findByEmail(email);
    return user ? user.verificationCode : undefined;
  }

  async clearVerificationCode(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (user) {
      user.verificationCode = undefined;
    }
  }

  async findByUserName(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
