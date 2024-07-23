import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';

import { DtoValidationPipe } from 'src/pipes/validation.pipe';
import { Response } from 'express';
import { z } from 'zod';
import { AuthService } from 'src/services/auth.service';
import { User, UsersService } from 'src/services/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

class Validator {
  constructor() {}

  static loginSchema() {
    return z.object({
      email: z.string().email(),
      // password: z.string().min(6),
    });
  }

  static registerSchema() {
    return z.object({
      fullName: z.string().optional(),
      email: z.string(),
      password: z.string(),
    });
  }
}

type LoginDto = z.infer<ReturnType<typeof Validator.loginSchema>>;
type RegisterDto = z.infer<ReturnType<typeof Validator.registerSchema>>;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Post('login')
  async login(
    @Body(new DtoValidationPipe(Validator.loginSchema()))
    body: LoginDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.authService.validateUser(
        body.email,
        body.password,
      );
      if (!user) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid email or password' });
        return;
      }
      const jwtPayload = { email: body.email, userId: '' };
      const access = await this.authService.login(jwtPayload);

      res.status(HttpStatus.OK).json({ token: access.access_token, user });
    } catch (error) {
      console.log({ error });
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid email or password' });
      return;
    }
  }

  @Post('register')
  async register(
    @Body(new DtoValidationPipe(Validator.registerSchema()))
    body: RegisterDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.usersService.findOne(body.email);
      if (user) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'User already exists' });
        return;
      }
      const hashedPassword = await this.authService.hashPassword(body.password);
      const newUser = new this.userModel({
        fullName: body.fullName,
        email: body.email,
        password: hashedPassword,
      });

      const data = await this.usersService.create(newUser);

      res.status(HttpStatus.OK).json({ data: data.toJSON() });
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException(
        'An error occurred please try again ',
      );
    }
  }
}
