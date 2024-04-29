import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from './routers/user/user.module';
import { ChatModule } from './routers/chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmModuleOptions } from './configs/typeorm.config';
import { MailModule } from './mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { MailController } from './mail/mail.controller';
import { ChatService } from './routers/chat/chat.service';
import { AuthController } from './auth/auth.controller';
import { ConfigService } from '@nestjs/config';

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
  controllers: [AuthController, MailController],
  providers: [AuthService, ChatService, ConfigService],
})
export class AppModule {}
