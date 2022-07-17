import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteProductDto } from './dto/favorite-product.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}
  favoriteProduct(dto: FavoriteProductDto): Promise<Favorite> {
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

  unfavoriteProduct(id: string) {
    return this.prisma.favorite.delete({ where: { id } });
  }

  getUserFavorites(id: string): Promise<Favorite[]> {
    return this.prisma.favorite.findMany({ where: { userId: id } });
  }
}
