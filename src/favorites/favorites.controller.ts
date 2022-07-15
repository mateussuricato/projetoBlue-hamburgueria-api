import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoriteProductDto } from './dto/favorite-product.dto';
import { FavoritesService } from './favorites.service';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  favoriteProduct(@Body() dto: FavoriteProductDto) {
    return this.favoritesService.favoriteProduct(dto)
  }
}
