import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async sendEmail(): Promise<any> {}

  async sendSMS(): Promise<any> {}
}
