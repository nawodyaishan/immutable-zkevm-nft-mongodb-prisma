import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtiverseConfigService {
  get contractAddress(): string {
    return process.env.CONTRACT_ADDRESS!;
  }

  get minterPrivateKey(): string {
    return process.env.MINTER_PRIVATE_KEY!;
  }

  get ownerPrivateKey(): string {
    return process.env.OWNER_PRIVATE_KEY!;
  }

  get rpcUrl(): string {
    return 'https://rpc.testnet.immutable.com';
  }

  get testNetChainName(): string {
    return 'imtbl-zkevm-testnet';
  }

  get apiKey(): string {
    return process.env.IMX_API_KEY!;
  }

  get publishableKey(): string {
    return process.env.IMX_PUBLISHABLE_KEY!;
  }
}
