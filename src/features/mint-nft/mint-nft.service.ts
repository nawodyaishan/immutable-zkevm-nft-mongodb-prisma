import { Injectable, Logger } from '@nestjs/common';
import { ERC721Client } from '@imtbl/contracts';
import { ArtiverseConfigService } from '../artiverse-config/artiverse-config.service';
import { getDefaultProvider, Wallet } from 'ethers'; // ethers v5
import { Provider, TransactionResponse } from '@ethersproject/providers';
import { blockchainData, config } from '@imtbl/sdk';

@Injectable()
export class MintNftService {
  private readonly provider: Provider;
  private contract: ERC721Client;
  private readonly logger = new Logger(MintNftService.name);
  private readonly imxClient: blockchainData.BlockchainData;

  constructor(private configService: ArtiverseConfigService) {
    this.provider = getDefaultProvider(this.configService.rpcUrl);
    this.contract = new ERC721Client(this.configService.contractAddress);
    this.imxClient = new blockchainData.BlockchainData({
      baseConfig: {
        environment: config.Environment.PRODUCTION,
        apiKey: this.configService.apiKey,
        publishableKey: this.configService.publishableKey,
      },
    });
  }

  async mintNFT(
    tokenIds: number[],
    recipient: string,
  ): Promise<TransactionResponse> {
    this.logger.log(
      `Minting NFTs with token IDs: [${tokenIds.join(', ')}] for recipient: ${recipient}`,
    );

    try {
      const wallet = new Wallet(
        this.configService.minterPrivateKey,
        this.provider,
      );
      const request = [{ to: recipient, tokenIds }];
      const gasOverrides = {
        // maxPriorityFeePerGas: ethers.utils.parseUnits('100', 'Gwei'),
        maxPriorityFeePerGas: 10e9,
        maxFeePerGas: 15e9,
        gasLimit: 200000,
      };

      const populatedTransaction = await this.contract.populateMintBatch(
        request,
        gasOverrides,
      );
      const result = await wallet.sendTransaction(populatedTransaction);
      await result.wait();

      this.logger.log(`Minting successful: Transaction hash - ${result.hash}`);
      return result;
    } catch (error) {
      this.logger.error(`Error during minting: ${error.message}`, error.stack);
      throw error;
    }
  }

  async grantMinterRole(): Promise<TransactionResponse> {
    this.logger.log('Granting minter role');

    try {
      const wallet = new Wallet(
        this.configService.ownerPrivateKey,
        this.provider,
      );
      const populatedTransaction = await this.contract.populateGrantMinterRole(
        wallet.address,
        {
          maxPriorityFeePerGas: 100e9,
          maxFeePerGas: 150e9,
        },
      );

      const result = await wallet.sendTransaction(populatedTransaction);
      await result.wait();

      this.logger.log(`Minter role granted: Transaction hash - ${result.hash}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Error during granting minter role: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async getUserInventory(userAddress: string): Promise<any> {
    this.logger.log(`Retrieving inventory for user: ${userAddress}`);

    try {
      const inventory = await this.imxClient.listNFTsByAccountAddress({
        chainName: this.configService.testNetChainName,
        contractAddress: this.configService.contractAddress,
        accountAddress: userAddress,
      });

      this.logger.log(`Inventory retrieved for user: ${userAddress}`);
      return inventory;
    } catch (error) {
      this.logger.error(
        `Error retrieving inventory for user: ${userAddress} - ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async listNFTOwnersByContractAddress(): Promise<any> {
    this.logger.log(
      `Listing NFT owners for contract: ${this.configService.contractAddress}`,
    );

    try {
      const ownersListResult =
        await this.imxClient.listNFTOwnersByContractAddress({
          contractAddress: this.configService.contractAddress,
          chainName: this.configService.testNetChainName,
        });

      this.logger.log(
        `Owners listed for contract: ${this.configService.contractAddress}`,
      );
      return ownersListResult;
    } catch (error) {
      this.logger.error(
        `Error listing NFT owners for contract: ${this.configService.contractAddress} - ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async listChains(): Promise<any> {
    this.logger.log('Listing supported chains');

    try {
      const chainsListResult = await this.imxClient.listChains({});

      this.logger.log('Supported chains listed successfully');
      return chainsListResult;
    } catch (error) {
      this.logger.error(
        `Error listing supported chains - ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
