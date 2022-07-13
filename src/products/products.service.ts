import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/users.entities';
import { handleError } from 'src/utils/handle-error-unique.util';
import { CreateProductDto } from './dto/create-product.dto';
import { FavoriteProductDto } from '../favorites/dto/favorite.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<Product | void> {
    return this.prisma.product.create({ data: dto }).catch(handleError);
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async verifyId(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }

    return product;
  }

  findOne(id: string): Promise<Product> {
    return this.verifyId(id);
  }

  async findUsersLiked(id: string) {
    const product: Product = await this.verifyId(id);

    return this.prisma.favorite.findMany({
      where: { productName: product.name },
      select: {
        productName: true,
        user: { select: { name: true, email: true } },
      },
    });
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product | void> {
    await this.verifyId(id);

    return this.prisma.product
      .update({ where: { id }, data: dto })
      .catch(handleError);
  }

  async remove(id: string) {
    await this.verifyId(id);

    return this.prisma.product.delete({ where: { id } });
  }

  async favorite(dto: FavoriteProductDto): Promise<Favorite> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException(`Entrada de id ${dto.userId} nao encontrada`);
    }

    const product: Product = await this.prisma.product.findUnique({
      where: { name: dto.productName },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto de nome ${dto.productName} não encontrado`,
      );
    }

    const data: Prisma.FavoriteCreateInput = {
      user: {
        connect: {
          id: dto.userId,
        },
      },
      product: {
        connect: {
          name: dto.productName,
        }
      },
    };

    return this.prisma.favorite.create({ data });
  }

  async disfavor(id: string) {
    await this.verifyId(id);

    return this.prisma.favorite.delete({ where: { id } });
  }
}
