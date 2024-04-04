import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/routers/user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
