import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Script } from 'vm';

export class FavoriteProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do usúário que está favoritando o produto',
    example: '28affa15-e38a-4b12-b607-edbd2d1b3fd',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do produto a ser favoritado',
    example: 'Hamburguer Salada',
  })
  productName: string
}
