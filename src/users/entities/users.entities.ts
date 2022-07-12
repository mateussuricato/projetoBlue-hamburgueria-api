import { Favorite } from "src/favorites/entities/favorite.entity";

export class User {
  id: string;
  name: string;
  email: string;
  password?: String;
  createdAt: Date;
  updatedAt: Date;
  favorites?: Favorite[]
}
