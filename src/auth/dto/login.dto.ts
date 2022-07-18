import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

  @IsEmail()
  @ApiProperty({
    description: "Email do usuário que está tentado logar",
    example: "usuario@email.com"
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Senha do usuário que está tentado logar",
    example: "12345678"
  })
  password: string
}
