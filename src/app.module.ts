import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routers/user/user.module';
import { ChatService } from './routers/chat/chat.service';
import { ChatModule } from './routers/chat/chat.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { typeOrmModuleOptions } from './configs/typeorm.config';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    UserModule,
    ChatModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController, AuthController, MailController],
  providers: [AppService, ChatService, MailService],
})
export class AppModule {}
