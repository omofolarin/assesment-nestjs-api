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
import { DtoValidationPipe } from 'src/pipes/validation.pipe';
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
    @Body(new DtoValidationPipe(Validator.createProductSchema()))
    body: CreateProductDto,
    @Res() res: Response,
  ): void {
    res.status(HttpStatus.OK).json({});
  }

  @Patch()
  update(
    @Body(new DtoValidationPipe(Validator.createProductSchema()))
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
    const docs = [
      {
        id: 1,
        name: 'Rose Bouquet',
        price: 29.99,
        description:
          'A beautiful bouquet of red roses, perfect for any occasion.',
        img: 'https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg',
      },
      {
        id: 2,
        name: 'Tulip Mix',
        price: 24.99,
        description: 'A vibrant mix of tulips in various colors.',
        img: 'https://t4.ftcdn.net/jpg/05/57/29/25/360_F_557292539_2kXYz0frOcCGISoYEd2MNTmxyT0lYyOj.jpg',
      },
      {
        id: 3,
        name: 'Sunflower Delight',
        price: 19.99,
        description:
          "A cheerful bouquet of sunflowers to brighten anyone's day.",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNPadzyMPOfk2_sayFOX-sQuRD1vL1fz_Ozg&s',
      },
      {
        id: 4,
        name: 'Orchid Elegance',
        price: 39.99,
        description: 'An elegant arrangement of exotic orchids.',
        img: 'https://t4.ftcdn.net/jpg/05/57/29/25/360_F_557292539_2kXYz0frOcCGISoYEd2MNTmxyT0lYyOj.jpg',
      },
      {
        id: 5,
        name: 'Lily Serenity',
        price: 27.99,
        description:
          'A serene bouquet of white lilies, symbolizing purity and elegance.',
        img: 'https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg',
      },
      {
        id: 6,
        name: 'Daisy Dreams',
        price: 17.99,
        description:
          'A delightful mix of daisies, perfect for a fresh and simple gift.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNPadzyMPOfk2_sayFOX-sQuRD1vL1fz_Ozg&s',
      },
      {
        id: 7,
        name: 'Carnation Love',
        price: 21.99,
        description: 'A lovely bouquet of pink and white carnations.',
        img: 'https://t4.ftcdn.net/jpg/05/57/29/25/360_F_557292539_2kXYz0frOcCGISoYEd2MNTmxyT0lYyOj.jpg',
      },
      {
        id: 8,
        name: 'Peony Passion',
        price: 34.99,
        description:
          'A lush bouquet of peonies, known for their rich and full blooms.',
        img: 'https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg',
      },
      {
        id: 9,
        name: 'Lavender Bliss',
        price: 22.99,
        description: 'A calming arrangement of lavender flowers.',
        img: 'https://t4.ftcdn.net/jpg/05/57/29/25/360_F_557292539_2kXYz0frOcCGISoYEd2MNTmxyT0lYyOj.jpg',
      },
      {
        id: 10,
        name: 'Mixed Wildflowers',
        price: 25.99,
        description:
          'A rustic bouquet of mixed wildflowers, bringing the beauty of nature indoors.',
        img: 'https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg',
      },
    ];
    res.status(HttpStatus.OK).json({ docs });
  }
}
