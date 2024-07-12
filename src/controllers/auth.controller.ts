import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AppService } from 'src/services';
import { Response } from 'express';
import { z } from 'zod';

class Validator {
  constructor() {}

  static loginSchema() {
    return z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
  }

  static registerSchema() {
    return z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().optional(),
      password: z.string().optional(),
    });
  }
}

type LoginDto = z.infer<ReturnType<typeof Validator.loginSchema>>;
type RegisterDto = z.infer<ReturnType<typeof Validator.registerSchema>>;

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  login(
    @Body(new ValidationPipe(Validator.loginSchema()))
    body: LoginDto,
    @Res() res: Response,
  ): void {
    const hello = '';

    res.status(HttpStatus.OK).json({});
  }

  @Post('register')
  register(
    @Body(new ValidationPipe(Validator.registerSchema()))
    body: RegisterDto,
    @Res() res: Response,
  ): void {
    res.status(HttpStatus.OK).json({});
  }
}
