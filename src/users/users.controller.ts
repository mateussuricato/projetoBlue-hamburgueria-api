import { Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('/users')
export class UserController {
  constructor (private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll()
  }

  @Post()
  create() {
    return this.usersService.create()
  }
}
