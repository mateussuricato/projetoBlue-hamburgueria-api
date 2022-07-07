import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<Product | void> {
    return this.prisma.product.create({ data: dto }).catch(this.handleError);
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

  handleError(error: Error): never {
    const errorMessage: string = `Entrada 'name' não está respeitando a constraint UNIQUE`;

    throw new UnprocessableEntityException(errorMessage);
  }

  findOne(id: string): Promise<Product> {
    return this.verifyId(id);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product | void> {
    await this.verifyId(id);

    return this.prisma.product
      .update({ where: { id }, data: dto })
      .catch(this.handleError);
  }

  async remove(id: string) {
    await this.verifyId(id);

    return this.prisma.product.delete({ where: { id } });
  }
}
