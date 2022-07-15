import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteProductDto } from './dto/favorite-product.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}
  favoriteProduct(dto: FavoriteProductDto) {
    const data: Prisma.FavoriteCreateInput = {
      user: {
        connect: {
          id: dto.userId,
        },
      },
      product: {
        connect: {
          name: dto.productName,
        },
      },
    };

    return this.prisma.favorite.create({ data });
  }
}
