import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'Naver',
          host: 'smtp.naver.com',
          port: 587,
          auth: {
            user: process.env.EMAILADDRESS,
            pass: process.env.EMAILPASSWORD,
          },
        },
        defaults: {
          from: `'saela' <modules@nestjs.com>`,
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [ConfigService],
})
export class MailModule {}
