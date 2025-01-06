import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transport: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transport = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      auth: {
        user: this.configService.get<string>('EMAIL_USERNAME'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendSignUpEmail(email: string, token: string): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `${this.configService.get<string>('CLIENT_HOST')}/callback?token=${token}&operation=register`,
      );
    }
    await this.transport.sendMail({
      from: 'info@my-app.com',
      to: email,
      subject: 'Take the final steps',
      html: `
        <h1>You are almost there</h1>
        <span>click the link below</span>
        <div>
        <a href="${this.configService.get<string>('CLIENT_HOST')}/callback?token=${token}&operation=register"> Create Your Account </a>
         </div>
        `,
    });
  }
  async sendLoginEmail(email: string, token: string): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `${this.configService.get<string>('CLIENT_HOST')}/callback?token=${token}&operation=login`,
      );
    }
    await this.transport.sendMail({
      from: 'info@my-app.com',
      to: email,
      subject: 'You back already?',
      html: `
        <span>click the link below to reach the stairs</span>
        <div>
        <a href="${this.configService.get<string>('CLIENT_HOST')}/callback?token=${token}&operation=login"> Sign In to My App </a>
         </div>
        `,
    });
  }
}
