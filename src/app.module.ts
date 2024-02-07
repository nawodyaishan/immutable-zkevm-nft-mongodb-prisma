import { Module } from '@nestjs/common';
import { ArtiverseConfigModule } from './features/artiverse-config/artiverse-config.module';
import { MintNftModule } from './features/mint-nft/mint-nft.module';
import { ConfigModule } from '@nestjs/config';
import { ArtworkModule } from './features/artwork/artwork.module';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    MintNftModule,
    ArtworkModule,
    ArtiverseConfigModule,
  ],
})
export class AppModule {}
