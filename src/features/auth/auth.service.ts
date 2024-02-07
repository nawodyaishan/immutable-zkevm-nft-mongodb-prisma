import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { CreateAuthPayloadDto } from './dto/create-auth.payload.dto';
import * as bcrypt from 'bcrypt';
import { CreateAuthResponseDto } from './dto/create-auth.response.dto';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(
    createAuthDto: CreateAuthPayloadDto,
  ): Promise<CreateAuthResponseDto> {
    const { email, username, password } = createAuthDto;
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });
      return {
        authUser: { id: user.id, email: user.email, username: user.username },
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(`User creation failed with:${error}`);
    }
  }
}
