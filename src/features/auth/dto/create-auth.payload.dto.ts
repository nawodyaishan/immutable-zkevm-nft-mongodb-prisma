import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthPayloadDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
