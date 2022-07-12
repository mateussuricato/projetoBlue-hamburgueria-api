import { Injectable } from '@nestjs/common';
import { handleError } from 'src/utils/handle-error-unique.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
 async create(dto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({ data: dto }).catch(handleError);
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  findOne(id: string): Promise<Category> {
    return this.prisma.category.findUnique({ where: { id } });
  }

 async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data: dto }).catch(handleError);
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
      select: { name: true },
    });
  }
}
