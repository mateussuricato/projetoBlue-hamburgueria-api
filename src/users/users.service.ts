import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entities';

@Injectable()
export class UsersService {
  users: User[] = [];

  getAll() {
    return this.users;
  }

  create() {
    return 'criação';
  }
}
