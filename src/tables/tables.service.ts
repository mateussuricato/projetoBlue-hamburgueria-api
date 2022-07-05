import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { table } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TablesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTableDto): Promise<Table> {
    return this.prisma.table.create({ data: dto }).catch(this.handleError);
  }

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async verifyId(id: string): Promise<Table> {
    const table: Table = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!table) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }

    return table;
  }

  handleError(error: Error): never {
    const errorMessage: string = `Entrada 'table' não está respeitando a constraint UNIQUE`;

    throw new UnprocessableEntityException(errorMessage);
  }

  findOne(id: string): Promise<Table> {
    return this.verifyId(id);
  }

  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    await this.verifyId(id);

    return this.prisma.table
      .update({ where: { id }, data: dto })
      .catch(this.handleError);
  }

  async remove(id: string) {
    await this.verifyId(id);

    return this.prisma.table.delete({
      where: { id },
      select: { number: true },
    });
  }
}
