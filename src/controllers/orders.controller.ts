import { AppService } from 'src/services';
import {
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
import { Response } from 'express';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: AppService) {}

  @Post()
  create(@Req() request: Request, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({});
  }

  @Patch()
  update(@Req() request: Request, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({});
  }

  @Delete()
  delete(@Req() request: Request, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({});
  }

  @Get(':id')
  read(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ): void {}

  @Get()
  list(@Req() request: Request, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({});
  }
}
