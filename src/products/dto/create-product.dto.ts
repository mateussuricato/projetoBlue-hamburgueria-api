import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do Produto',
    example: 'Hamburguer Bacon',
  })
  name: String;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição do Produto',
    example: '1 fatia de mussarela, 150g de Hamburguer...',
  })
  description: String;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: 'Preço do Produto',
    example: '21.99',
  })
  price: Number;

  @IsUrl()
  @ApiProperty({
    description: 'Link da Imagem do Produto',
    example: 'https://i.imgur.com/197EMuj.jpeg',
  })
  image: String;
}
