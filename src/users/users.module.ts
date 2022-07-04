import { Controller, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from 'src/products/products.module';
import { UserController } from './users.controller';
import { UsersService } from './users.service';


@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
