import { Module } from '@nestjs/common';
import { MintNftController } from './mint-nft.controller';
import { ArtiverseConfigModule } from '../artiverse-config/artiverse-config.module';
import { MintNftService } from './mint-nft.service';

@Module({
  controllers: [MintNftController],
  imports: [ArtiverseConfigModule],
  providers: [MintNftService],
})
export class MintNftModule {}
