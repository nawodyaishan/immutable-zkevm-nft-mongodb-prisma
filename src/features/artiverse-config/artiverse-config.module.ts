import { Module } from '@nestjs/common';
import { ArtiverseConfigService } from './artiverse-config.service';

@Module({
  providers: [ArtiverseConfigService],
  exports: [ArtiverseConfigService],
})
export class ArtiverseConfigModule {}
