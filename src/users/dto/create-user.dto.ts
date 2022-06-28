import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"


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
}
