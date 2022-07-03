import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entities';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista todos os usuários'
  })
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista de usuários por id'
  })
  getByid(@Param("id") id: string): Promise<User> {
    return this.usersService.getById(id)
  }

  @Post()
  @ApiOperation({
    summary: "Cria um novo usuário",
  })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto)
  }
}
