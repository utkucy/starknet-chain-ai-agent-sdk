import axios from "axios";
import {
  StarkScanConfig,
  Transaction,
  NFTContract,
  TokenTransfer,
  ContractStats,
  Block,
  Event,
  Contract,
  Message,
  NFTBalance,
  NFTHolder,
} from "../types";

export class StarkScanClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(config: StarkScanConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api.starkscan.com/v1";
  }

  private async makeRequest<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        headers: {
          "x-api-key": this.apiKey,
        },
        params,
      });
      return response.data as T;
    } catch (error) {
      throw new Error(`StarkScan API Error: ${error}`);
    }
  }

  // Block APIs
  async getBlock(blockNumber: number): Promise<Block> {
    return this.makeRequest<Block>(`/block/${blockNumber}`);
  }

  async getLatestBlocks(limit: number = 10): Promise<Block[]> {
    return this.makeRequest<Block[]>(`/blocks`, { limit });
  }

  // Transaction APIs
  async getTransaction(hash: string): Promise<Transaction> {
    return this.makeRequest<Transaction>(`/transaction/${hash}`);
  }

  async getTransactions(
    address: string,
    limit: number = 10
  ): Promise<Transaction[]> {
    return this.makeRequest<Transaction[]>(`/transactions`, { address, limit });
  }

  // Event APIs
  async getContractEvents(
    contractAddress: string,
    fromBlock?: number,
    limit: number = 10
  ): Promise<Event[]> {
    return this.makeRequest<Event[]>(`/events`, {
      contract: contractAddress,
      from_block: fromBlock,
      limit,
    });
  }

  // Contract APIs
  async getContract(address: string): Promise<Contract> {
    return this.makeRequest<Contract>(`/contract/${address}`);
  }

  async getContractTransactions(
    address: string,
    limit: number = 10
  ): Promise<Transaction[]> {
    return this.makeRequest<Transaction[]>(
      `/contract/${address}/transactions`,
      {
        limit,
      }
    );
  }

  // Message APIs
  async getL2ToL1Messages(
    fromAddress: string,
    limit: number = 10
  ): Promise<Message[]> {
    return this.makeRequest<Message[]>(`/messages/l2-to-l1`, {
      from_address: fromAddress,
      limit,
    });
  }

  async getL1ToL2Messages(
    toAddress: string,
    limit: number = 10
  ): Promise<Message[]> {
    return this.makeRequest<Message[]>(`/messages/l1-to-l2`, {
      to_address: toAddress,
      limit,
    });
  }

  // NFT APIs
  async getNFTContract(address: string): Promise<NFTContract> {
    return this.makeRequest<NFTContract>(`/nft/contract/${address}`);
  }

  async getNFTTransfers(
    contractAddress: string,
    limit: number = 10
  ): Promise<TokenTransfer[]> {
    return this.makeRequest<TokenTransfer[]>(
      `/nft/${contractAddress}/transfers`,
      { limit }
    );
  }

  async getNFTBalance(
    contractAddress: string,
    ownerAddress: string
  ): Promise<NFTBalance[]> {
    return this.makeRequest<NFTBalance[]>(`/nft/${contractAddress}/balance`, {
      owner: ownerAddress,
    });
  }

  async getNFTHolders(
    contractAddress: string,
    limit: number = 10
  ): Promise<NFTHolder[]> {
    return this.makeRequest<NFTHolder[]>(`/nft/${contractAddress}/holders`, {
      limit,
    });
  }

  // Analytics APIs
  async getContractStats(address: string): Promise<ContractStats> {
    return this.makeRequest<ContractStats>(`/stats/contract/${address}`);
  }

  async getTokenTransferVolume(contractAddress: string): Promise<string> {
    return this.makeRequest<string>(
      `/stats/token-transfer-volume/${contractAddress}`
    );
  }
}
