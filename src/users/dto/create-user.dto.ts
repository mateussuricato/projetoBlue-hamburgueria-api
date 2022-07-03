import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"


export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "User name",
    example: "Mateus",
  })
  name: string

  @IsEmail()
  @ApiProperty({
    description: "User email",
    example: "mateus@hotmail.com",
  })
  email: string

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: "12345",
    example: "Senha do usuário a ser criado",
  })
  password: string
}
