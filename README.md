# Starknet Chain Data AI Agent SDK

A powerful SDK for analyzing StarkNet blockchain data using advanced AI capabilities. This SDK combines StarkScan API data with multiple AI providers to deliver comprehensive blockchain analytics and insights.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
  - [StarkScan Configuration](#starkscan-configuration)
  - [LLM Provider Configuration](#llm-provider-configuration)
- [Tools and Analytics](#tools-and-analytics)
- [Memory System](#memory-system)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Development](#development)
- [License](#license)

## Features

### Core Features

- Multi-provider AI support (OpenAI, Anthropic, Google Gemini, OpenRouter)
- Comprehensive StarkNet data analysis
- Context-aware memory system
- Type-safe TypeScript implementation
- Modular and extensible architecture

### Analytics Tools

1. **Transaction Analysis**

   - Detailed transaction pattern analysis
   - Gas usage efficiency insights
   - Contract interaction patterns

2. **Block Explorer**

   - Block production rate analysis
   - Transaction density patterns
   - Network activity trends

3. **Event Monitor**

   - Real-time contract event analysis
   - Pattern recognition
   - Anomaly detection

4. **Contract Analytics**

   - Usage pattern analysis
   - User interaction trends
   - Performance metrics
   - Volume analysis

5. **NFT Analytics**

   - Portfolio analysis
   - Market trend analysis
   - Holder distribution analysis
   - Trading pattern insights

6. **Message Bridge Monitor**
   - L1<>L2 message pattern analysis
   - Cross-layer interaction insights
   - Bridge usage analytics

## Installation

```bash
npm install starknet-ai-agent
```

## Quick Start

```typescript
import { StarknetChainAIAgent } from "starknet-chain-ai-agent";

// Initialize with OpenAI
const agent = new StarknetChainAIAgent({
  starkScan: {
    apiKey: "your-starkscan-api-key",
  },
  llm: {
    provider: "openai",
    config: {
      apiKey: "your-openai-api-key",
      defaultModel: "gpt-4-turbo-preview",
    },
  },
});

// Analyze a transaction
const analysis = await agent.process(
  "Analyze the trading patterns for NFT contract 0x123..."
);
```

## Configuration

### StarkScan Configuration

```typescript
interface StarkScanConfig {
  apiKey: string;
  baseUrl?: string; // Optional, defaults to mainnet
}
```

Available networks:

- Mainnet: `https://api.starkscan.co`
- Sepolia: `https://api-sepolia.starkscan.co`

### LLM Provider Configuration

#### OpenAI

```typescript
{
  provider: 'openai',
  config: {
    apiKey: 'your-openai-api-key',
    defaultModel: 'gpt-4-turbo-preview', // Optional
    organization: 'your-org-id', // Optional
  }
}
```

#### Anthropic (Claude)

```typescript
{
  provider: 'anthropic',
  config: {
    apiKey: 'your-anthropic-api-key',
    defaultModel: 'claude-3-opus-20240229', // Optional
    version: '2024-02-29', // Optional
  }
}
```

#### Google Gemini

```typescript
{
  provider: 'gemini',
  config: {
    apiKey: 'your-gemini-api-key',
    defaultModel: 'gemini-pro', // Optional
    projectId: 'your-project-id', // Optional
  }
}
```

#### OpenRouter

```typescript
{
  provider: 'openrouter',
  config: {
    apiKey: 'your-openrouter-api-key',
    defaultModel: 'anthropic/claude-3-opus', // Optional
    modelPreferences: { // Optional
      reasoning: 'anthropic/claude-3-opus',
      analysis: 'google/gemini-pro',
      synthesis: 'meta-llama/llama-2-70b-chat'
    }
  }
}
```

## Tools and Analytics

### Transaction Analysis

```typescript
// Analyze a specific transaction
const analysis = await agent.process(
  "Analyze transaction 0x123... for patterns and efficiency"
);
```

### Block Explorer

```typescript
// Analyze recent blocks
const blockAnalysis = await agent.process(
  "Analyze the last 10 blocks for network activity patterns"
);
```

### Event Monitor

```typescript
// Monitor contract events
const eventAnalysis = await agent.process(
  "Monitor and analyze events from contract 0x456... from block 1000"
);
```

### Contract Analytics

```typescript
// Analyze contract activity
const contractAnalysis = await agent.process(
  "Analyze user interaction patterns for contract 0x789..."
);
```

### NFT Analytics

```typescript
// Analyze NFT portfolio
const nftAnalysis = await agent.process(
  "Analyze NFT portfolio for wallet 0xabc..."
);

// Analyze NFT market
const marketAnalysis = await agent.process(
  "Analyze trading patterns for NFT collection 0x123..."
);
```

### Message Bridge Monitor

```typescript
// Analyze cross-layer messages
const bridgeAnalysis = await agent.process(
  "Analyze L1<>L2 message patterns for address 0xdef..."
);
```

## Memory System

The SDK includes a context-aware memory system that:

- Stores previous analyses and results
- Provides relevant context for new queries
- Improves analysis accuracy over time

```typescript
// The memory system is automatically used in each query
const analysis1 = await agent.process("Query 1...");
const analysis2 = await agent.process("Query 2..."); // Uses context from Query 1
```

## API Reference

### StarknetChainAIAgent

```typescript
class StarknetChainAIAgent {
  constructor(config: { starkScan: StarkScanConfig; llm: LLMOptions });

  async process(query: string, context?: Record<string, any>): Promise<string>;
}
```

### StarkScan Client

```typescript
class StarkScanClient {
  // Block APIs
  async getBlock(blockNumber: number): Promise<Block>;
  async getLatestBlocks(limit?: number): Promise<Block[]>;

  // Transaction APIs
  async getTransaction(hash: string): Promise<Transaction>;
  async getTransactions(
    address: string,
    limit?: number
  ): Promise<Transaction[]>;

  // Event APIs
  async getContractEvents(
    contractAddress: string,
    fromBlock?: number,
    limit?: number
  ): Promise<Event[]>;

  // Contract APIs
  async getContract(address: string): Promise<Contract>;
  async getContractTransactions(
    address: string,
    limit?: number
  ): Promise<Transaction[]>;

  // NFT APIs
  async getNFTContract(address: string): Promise<NFTContract>;
  async getNFTTransfers(
    contractAddress: string,
    limit?: number
  ): Promise<TokenTransfer[]>;
  async getNFTBalance(
    contractAddress: string,
    ownerAddress: string
  ): Promise<NFTBalance[]>;
  async getNFTHolders(
    contractAddress: string,
    limit?: number
  ): Promise<NFTHolder[]>;

  // Analytics APIs
  async getContractStats(address: string): Promise<ContractStats>;
  async getTokenTransferVolume(contractAddress: string): Promise<string>;
}
```

## Examples

### Complex Analysis

```typescript
// Comprehensive NFT market analysis
const analysis = await agent.process(`
  Analyze the NFT contract 0x123...
  Include:
  1. Recent trading patterns
  2. Holder distribution
  3. Market trends
  4. Notable activities
  Compare with previous week's data
`);

// Cross-contract interaction analysis
const analysis = await agent.process(`
  Analyze interactions between contracts:
  - Contract A: 0x456...
  - Contract B: 0x789...
  Focus on:
  1. Transaction patterns
  2. Event correlations
  3. Volume trends
`);
```

## Error Handling

The SDK implements comprehensive error handling:

```typescript
try {
  const analysis = await agent.process("...");
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
    // Handle specific error types
  }
}
```

Common error types:

- StarkScan API errors
- LLM provider errors
- Rate limiting
- Network errors
- Invalid input errors

## Development

1. Clone the repository

```bash
git clone https://github.com/yourusername/starknet-ai-agent.git
```

2. Install dependencies

```bash
npm install
```

3. Build the project

```bash
npm run build
```

4. Run tests

```bash
npm test
```

5. Lint code

```bash
npm run lint
```

6. Format code

```bash
npm run format
```

## License

MIT

---

For more information, bug reports, or feature requests, please visit our [GitHub repository](https://github.com/yourusername/starknet-ai-agent).
