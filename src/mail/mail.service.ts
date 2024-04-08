import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail() {
    await this.mailerService.sendMail({
      to: 'myEmail',

      subject: 'Test',

      text: '테스트',
    });
  }
}
