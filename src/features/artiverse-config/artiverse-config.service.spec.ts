import { Test, TestingModule } from '@nestjs/testing';
import { ArtiverseConfigService } from './artiverse-config.service';

describe('ArtiverseConfigService', () => {
  let service: ArtiverseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtiverseConfigService],
    }).compile();

    service = module.get<ArtiverseConfigService>(ArtiverseConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
