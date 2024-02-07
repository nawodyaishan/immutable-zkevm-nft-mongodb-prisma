import { Module } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { ArtworkController } from './artwork.controller';
import { PrismaService } from '../../prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ArtworkController],
  imports: [JwtModule.register({})],
  providers: [JwtService, ArtworkService, PrismaService],
})
export class ArtworkModule {}
