import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from 'src/services';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Response } from 'express';
import { z } from 'zod';

class Validator {
  static createProductSchema() {
    return z.object({
      title: z.string(),
      price: z.number(),
      category: z.number(),
      description: z.string(),
    });
  }

  static updateProductSchema() {
    return z.object({});
  }
}

type CreateProductDto = z.infer<
  ReturnType<typeof Validator.createProductSchema>
>;

type UpdateProductDto = z.infer<
  ReturnType<typeof Validator.updateProductSchema>
>;

@Controller('products')
export class ProductController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(
    @Body(new ValidationPipe(Validator.createProductSchema()))
    body: CreateProductDto,
    @Res() res: Response,
  ): void {
    res.status(HttpStatus.OK).json({});
  }

  @Patch()
  update(
    @Body(new ValidationPipe(Validator.createProductSchema()))
    body: UpdateProductDto,
    @Res() res: Response,
  ): void {
    res.status(HttpStatus.OK).json({});
  }

  @Delete()
  delete(@Req() req: Request, @Res() res: Response): void {}

  @Get(':id')
  read(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ): void {
    res.status(HttpStatus.OK).json({});
  }

  @Get()
  list(@Req() request: Request, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({});
  }
}
