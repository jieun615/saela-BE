import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from './routers/user/user.module';
import { ChatModule } from './routers/chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmModuleOptions } from './configs/typeorm.config';
import { MailModule } from './mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    UserModule,
    ChatModule,
    AuthModule,
    MailModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  // controllers: [AuthController, MailController],
  // providers: [AuthService, ChatService, MailService],
})
export class AppModule {}
