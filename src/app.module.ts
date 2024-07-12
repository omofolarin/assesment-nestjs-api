import {
  AppController,
  AuthController,
  OrderController,
  ProductController,
} from './controllers';
import { AppService, NotificationService } from './services';

import { FirebaseAdminService } from './services/firebase.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    AppController,
    AuthController,
    ProductController,
    OrderController,
  ],
  providers: [AppService, NotificationService, FirebaseAdminService],
})
export class AppModule {}
