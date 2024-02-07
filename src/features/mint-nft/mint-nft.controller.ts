import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { MintNftService } from './mint-nft.service';

@Controller('nft')
export class MintNftController {
  private readonly logger = new Logger(MintNftController.name);

  constructor(private readonly mintNftService: MintNftService) {}

  @Post('mint')
  async mint(
    @Body('tokenIds') tokenIds: number[],
    @Body('recipient') recipient: string,
  ) {
    this.logger.log(
      `Received request to mint NFTs for recipient: ${recipient} with token IDs: [${tokenIds.join(', ')}]`,
    );

    try {
      const result = await this.mintNftService.mintNFT(tokenIds, recipient);
      this.logger.log(
        `Successfully minted NFTs: Transaction hash - ${result.hash}`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Error during minting NFTs for recipient: ${recipient} - ${error.message}`,
      );
      throw error;
    }
  }

  @Post('grant-minter-role')
  async grantMinterRole() {
    this.logger.log('Received request to grant minter role');

    try {
      const result = await this.mintNftService.grantMinterRole();
      this.logger.log(
        `Successfully granted minter role: Transaction hash - ${result.hash}`,
      );
      return result;
    } catch (error) {
      this.logger.error(`Error during granting minter role - ${error.message}`);
      throw error;
    }
  }

  @Get('user-inventory')
  async getUserInventory(@Query('address') userAddress: string) {
    this.logger.log(
      `Received request to get user-inventory with Query ${userAddress}`,
    );
    // Validate the user address
    if (!this.isValidAddress(userAddress)) {
      throw new BadRequestException('Invalid user address format.');
    }

    this.logger.log(`Fetching inventory for address: ${userAddress}`);
    return this.mintNftService.getUserInventory(userAddress);
  }

  @Get('list-nft-owners')
  async listNFTOwners() {
    this.logger.log(`Received request to list owners for contract`);
    return this.mintNftService.listNFTOwnersByContractAddress();
  }

  @Get('list-chains')
  async listSupportedChains() {
    this.logger.log('Received request to list supported chains');
    return this.mintNftService.listChains();
  }

  private isValidAddress(address: string): boolean {
    return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
  }
}
