import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderToProductDto } from './create-order-to-product.dto';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Número de mesa que fez o pedido',
    example: 10,
  })
  tableNumber: number;

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que fez o pedido',
    example: 10,
  })
  userId: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderToProductDto)
  @ApiProperty({
    description:
      'Lista de ids e quantidade dos produtos que estão sendo pedidos',
    example: `['{id: 28affa15-e38a-4b12-b607-edbd2d1b3fd, quantity: 2}', '{id: 28affa15-e38a-4b12-b607-edbd2d1b3fj, quantity: 5}']`,
  })
  products: CreateOrderToProductDto[];
}
