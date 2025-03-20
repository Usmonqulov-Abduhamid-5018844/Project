import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'usmonqulovabduhamid00@gmail.com',
        pass: 'vxex rcde nuwb gsze',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    let message = await this.transporter.sendMail({
      to,
      subject,
      text,
    });
    
    return message;
  }
}
