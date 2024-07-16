import {
  AppController,
  AuthController,
  OrderController,
  ProductController,
} from './controllers';
import { AppService, NotificationService } from './services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema, UsersService } from './services/users.service';

import { AuthService } from './services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from './services/mail.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SMSService } from './services/sms.service';

@Module({
  exports: [UsersService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigModule globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [
    AppController,
    AuthController,
    ProductController,
    OrderController,
  ],
  providers: [
    AppService,
    AuthService,
    NotificationService,
    MailService,
    SMSService,
    UsersService,
    JwtService,
  ],
})
export class AppModule {}
