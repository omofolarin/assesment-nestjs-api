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
import { Response } from 'express';
import { DtoValidationPipe } from 'src/pipes/validation.pipe';
import { z } from 'zod';
import { SMSService } from 'src/services/sms.service';
import { MailService } from 'src/services/mail.service';

class Validator {
  static createOrderSchema() {
    return z.object({
      email: z.string(),
      phone: z.string(),
      address: z.string(),
      additionalInfo: z.string().optional(),
      fullName: z.string().optional(),
      orderItems: z.array(
        z.object({
          qty: z.number().min(1),
          price: z.number().min(0),
          img: z.string().url(),
          name: z.string(),
          description: z.string().optional(),
        }),
      ),
    });
  }

  static updateOrderSchema() {
    return z.object({});
  }
}

type CreateOrderDto = z.infer<ReturnType<typeof Validator.createOrderSchema>>;

@Controller('orders')
export class OrderController {
  constructor(
    private readonly smsService: SMSService,
    private readonly emailService: MailService,
  ) {}

  @Post()
  async create(
    @Body(new DtoValidationPipe(Validator.createOrderSchema()))
    body: CreateOrderDto,
    @Req() request: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const genOrderSummary = ({ orderItems }) => {
        // Calculate total price
        const totalPrice = orderItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0,
        );

        // Generate item summaries
        const itemSummaries = orderItems
          .map(
            (item) =>
              `Item: ${item.name}\nQuantity: ${item.qty}\nPrice: $${item.price.toFixed(2)}\nTotal: $${(item.price * item.qty).toFixed(2)}\nDescription: ${item.description || 'N/A'}\nImage: ${item.img}\n`,
          )
          .join('\n');

        return `Order Summary:\n\n${itemSummaries}\nTotal Price: $${totalPrice.toFixed(2)}`;
      };

      const email = {
        to: body.email,
        subject: 'New order',
        text: genOrderSummary({ orderItems: body.orderItems }),
        html: ``,
      };

      const sms = {
        to: body.phone,
        message: genOrderSummary({ orderItems: body.orderItems }),
      };
      this.emailService.sendEmail(
        email.to,
        email.subject,
        email.text,
        email.subject,
      );
      this.smsService.sendSms(sms.to, sms.message);

      res.status(HttpStatus.OK).json({
        message: 'order created successfully',
      });
    } catch (error) {
      console.log({ error });
    }
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
