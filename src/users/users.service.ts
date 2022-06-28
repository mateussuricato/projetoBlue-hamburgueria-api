import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entities';
import { uuid } from 'uuidv4';

@Injectable()
export class UsersService {
  users: User[] = [
    {
      name: 'Mateus',
      email: 'mateus@hotmail.com',
      id: uuid(),
    },
    {
      name: 'Marcos',
      email: 'marcos@hotmail.com',
      id: uuid(),
    },
    {
      name: 'Wesley',
      email: 'Wesley@hotmail.com',
      id: uuid(),
    },
  ];

  getAll() {
    return this.users;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = { id: uuid(), ...createUserDto };

    this.users.push(newUser);
    return newUser;
  }
}
