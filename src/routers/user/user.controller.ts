import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserService } from './user.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getProfile(@Req() req: any) {
    const user = req.user;
    return user;
  }
}
