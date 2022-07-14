import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderToProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do produto sendo pedido',
    example: 'a94810f8-0eba-418c-8405-d19d4ef7730e',
  })
  productId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Quantidade de produtos',
    example: 7,
  })
  quantity: number;
}
