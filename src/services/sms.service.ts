import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SMSService {
  private readonly apiKey: string;
  private readonly senderId: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('TERMII_API_KEY');
    this.senderId = this.configService.get<string>('TERMII_SENDER_ID');
    this.baseUrl = 'https://api.ng.termii.com/api/sms';
  }

  async sendSms(to: string, message: string) {
    const url = `${this.baseUrl}/send`;

    try {
      const response = await axios.post(url, {
        to,
        from: this.senderId,
        sms: message,
        type: 'plain',
        channel: 'generic',
        api_key: this.apiKey,
      });

      if (response.data.successful) {
        return { status: 'success', message: 'SMS sent successfully' };
      } else {
        throw new InternalServerErrorException('Failed to send SMS');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new InternalServerErrorException('Error sending SMS');
    }
  }
}
