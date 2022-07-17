import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoriteProductDto } from './dto/favorite-product.dto';
import { Favorite } from './entities/favorite.entity';
import { FavoritesService } from './favorites.service';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  favoriteProduct(@Body() dto: FavoriteProductDto): Promise<Favorite> {
    return this.favoritesService.favoriteProduct(dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  unfavoriteProduct(@Param('id') id: string) {
    return this.favoritesService.unfavoriteProduct(id)
  }
}
