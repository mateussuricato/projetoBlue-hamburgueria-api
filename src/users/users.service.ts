import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './entities/users.entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
 async create(dto: CreateUserDto): Promise<User | void>  {
    const hashedPassword = await bcrypt.hash(dto.password, 8);

    const data: CreateUserDto = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    };

    return this.prisma.user.create({ data }).catch(this.handleError)
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async verifyId(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }

    return user;
  }

  handleError(error: Error): never {

    const errorMessage: string = `Entrada 'email' não está respeitando a constraint UNIQUE`;

    throw new UnprocessableEntityException(errorMessage);
  }

  findOne(id: string): Promise<User> {
    return this.verifyId(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | void> {
    await this.verifyId(id);

    return this.prisma.user.update({ where: { id }, data: dto }).catch(this.handleError);;
  }

  async remove(id: string): Promise<User> {
    await this.verifyId(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
