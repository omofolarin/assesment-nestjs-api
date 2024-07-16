import * as postmark from 'postmark';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly client: postmark.ServerClient;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('POSTMARK_API_KEY');
    this.client = new postmark.ServerClient(apiKey);
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    try {
      const result = await this.client.sendEmail({
        From: 'contact@holuid.com',
        To: to,
        Subject: subject,
        TextBody: text,
        HtmlBody: html,
      });
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Error sending email');
    }
  }
}
