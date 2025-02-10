export interface StarkScanConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface Memory {
  addEntry: (entry: any) => void;
  getRelevantContext: (query: string) => Promise<any>;
  clearMemory: () => void;
  getEntries: () => any[];
}

export type ToolCategory =
  | "transaction"
  | "nft"
  | "analytics"
  | "market"
  | "block"
  | "event"
  | "message";

export interface Tool {
  name: string;
  description: string;
  category: ToolCategory;
  execute: (params: Record<string, any>) => Promise<any>;
}

export interface Transaction {
  hash: string;
  blockNumber: number;
  timestamp: string;
  contractAddress: string;
  entrypoint: string;
  maxFee: string;
  actualFee: string;
  status: string;
}

export interface Block {
  number: number;
  hash: string;
  parentHash: string;
  timestamp: string;
  transactionCount: number;
  status: string;
}

export interface Event {
  fromAddress: string;
  keys: string[];
  data: string[];
  blockNumber: number;
  transactionHash: string;
  timestamp: string;
}

export interface Contract {
  address: string;
  type: string;
  class_hash: string;
  deployed_by_address: string;
  timestamp: string;
  class_version: string;
}

export interface Message {
  msgHash: string;
  fromAddress: string;
  toAddress: string;
  payload: string[];
  nonce: string;
  timestamp: string;
}

export interface NFTContract {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
}

export interface NFTBalance {
  contractAddress: string;
  ownerAddress: string;
  tokenId: string;
  amount: string;
  tokenURI?: string;
}

export interface NFTHolder {
  holderAddress: string;
  balance: string;
  tokenCount: number;
  lastActivityTime: string;
}

export interface TokenTransfer {
  from: string;
  to: string;
  amount: string;
  timestamp: string;
}

export interface ContractStats {
  dailyActiveUsers: number;
  totalTransactions: number;
  volume24h: string;
}
