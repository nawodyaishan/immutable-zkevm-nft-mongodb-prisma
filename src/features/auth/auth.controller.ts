import { AuthService } from './auth.service';
import { CreateAuthPayloadDto } from './dto/create-auth.payload.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthResponseDto } from './dto/create-auth.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() createAuthDto: CreateAuthPayloadDto,
  ): Promise<CreateAuthResponseDto> {
    return await this.authService.createUser(createAuthDto);
  }
}
