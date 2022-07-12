import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do Produto',
    example: 'Hamburguer Bacon',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição do Produto',
    example: '1 fatia de mussarela, 150g de Hamburguer...',
  })
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: 'Preço do Produto',
    example: '21.99',
  })
  price: number;

  @IsUrl()
  @ApiProperty({
    description: 'Link da Imagem do Produto',
    example: 'https://i.imgur.com/197EMuj.jpeg',
  })
  image: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id da categoria do Produto',
    example: '28affa15-e38a-4b12-b607-edbd2d1b3fd9',
  })
  categoryId: string
}
