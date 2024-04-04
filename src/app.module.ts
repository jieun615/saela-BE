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

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    UserModule,
    ChatModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, ChatService],
})
export class AppModule {}
