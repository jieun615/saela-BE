import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'naver',
      auth: {
        user: process.env.EMAILADDRESS,
        pass: process.env.EMAILPASSWORD,
      },
    });
  }

  async sendVerificationToEmail(email: string, code: string): Promise<void> {
    const emailOptions: EmailOptions = {
      from: process.env.EMAILADDRESS, // 보내는 사람 이메일 주소
      to: email, // 회원가입한 사람의 받는 이메일 주소
      subject: '가입 인증 메일',
      html: `<h1> 인증 코드를 입력하면 가입 인증이 완료됩니다.</h1><br/>${code}`,
    };

    return await this.transporter.sendMail(emailOptions);
  }
}
