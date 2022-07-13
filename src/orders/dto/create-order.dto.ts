import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsUUID } from "class-validator";

export class CreateOrderDto {

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: "Número de mesa que fez o pedido",
    example: 10,
  })
  tableNumber: number;

  @IsUUID()
  @ApiProperty({
    description: "Id do usuário que fez o pedido",
    example: 10,
  })
  userId: string;

  @IsUUID(undefined, {each: true})
  @ApiProperty({
    description: "Çista de ids dos produtos que estão sendo pedidos",
    example: `['28affa15-e38a-4b12-b607-edbd2d1b3fd', '28affa15-e38a-4b12-b607-edbd2d1b3fj']`,
  })
  products: string[];
}
