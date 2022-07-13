import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      table: {
        connect: {
          number: dto.tableNumber,
        },
      },
      user: {
        connect: {
          id: dto.userId,
        },
      },
      products: {
        connect: dto.products.map((element) => {
          return { id: element };
        }),
      },
    };

    return this.prisma.order.create({
      data,
      select: {
        id: true,
        tableNumber: true,
        createdAt: true,
        userId: true,
        products: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      select: {
        id: true,
        tableNumber: true,
        createdAt: true,
        userId: true,
        products: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
}
