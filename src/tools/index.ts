import { LLMProvider, LLMMessage } from "../types/llm";
import { Tool, ToolCategory } from "../types";
import { StarkScanClient } from "../clients/starkscan";

export function initializeTools(
  starkScan: StarkScanClient,
  llm: LLMProvider
): Map<string, Tool> {
  const tools = new Map<string, Tool>();

  // Transaction Analysis Tool
  tools.set("transactionAnalyzer", {
    name: "transactionAnalyzer",
    description: "Analyzes transaction patterns and details",
    category: "transaction" as ToolCategory,
    execute: async (params) => {
      const tx = await starkScan.getTransaction(params.hash);
      const analysis = await analyzeTransaction(tx, llm);
      return { transaction: tx, analysis };
    },
  });

  // Block Explorer Tool
  tools.set("blockExplorer", {
    name: "blockExplorer",
    description: "Analyzes block activity and patterns",
    category: "block" as ToolCategory,
    execute: async (params) => {
      const blocks = await starkScan.getLatestBlocks(params.limit || 10);
      const analysis = await analyzeBlocks(blocks, llm);
      return { blocks, analysis };
    },
  });

  // Event Monitor Tool
  tools.set("eventMonitor", {
    name: "eventMonitor",
    description: "Monitors and analyzes contract events",
    category: "event" as ToolCategory,
    execute: async (params) => {
      const events = await starkScan.getContractEvents(
        params.contractAddress,
        params.fromBlock,
        params.limit || 10
      );
      const analysis = await analyzeEvents(events, llm);
      return { events, analysis };
    },
  });

  // Contract Analytics Tool
  tools.set("contractAnalyzer", {
    name: "contractAnalyzer",
    description: "Analyzes contract statistics and usage patterns",
    category: "analytics" as ToolCategory,
    execute: async (params) => {
      const stats = await starkScan.getContractStats(params.address);
      const volume = await starkScan.getTokenTransferVolume(params.address);
      const analysis = await analyzeContractMetrics(stats, volume, llm);
      return { stats, volume, analysis };
    },
  });

  // NFT Analytics Tool
  tools.set("nftAnalyzer", {
    name: "nftAnalyzer",
    description: "Analyzes NFT contract activity and market trends",
    category: "nft" as ToolCategory,
    execute: async (params) => {
      const contract = await starkScan.getNFTContract(params.address);
      const transfers = await starkScan.getNFTTransfers(params.address);
      const analysis = await analyzeNFTActivity(contract, transfers, llm);
      return { contract, transfers, analysis };
    },
  });

  // Message Bridge Monitor
  tools.set("messageBridgeMonitor", {
    name: "messageBridgeMonitor",
    description: "Analyzes L1<>L2 message patterns",
    category: "message" as ToolCategory,
    execute: async (params) => {
      const l2ToL1Messages = await starkScan.getL2ToL1Messages(
        params.address,
        params.limit || 10
      );
      const l1ToL2Messages = await starkScan.getL1ToL2Messages(
        params.address,
        params.limit || 10
      );
      const analysis = await analyzeMessages(
        l2ToL1Messages,
        l1ToL2Messages,
        llm
      );
      return { l2ToL1Messages, l1ToL2Messages, analysis };
    },
  });

  return tools;
}

async function analyzeTransaction(tx: any, llm: LLMProvider): Promise<string> {
  const messages: LLMMessage[] = [
    {
      role: "system",
      content: "You are an AI assistant analyzing StarkNet blockchain data.",
    },
    {
      role: "user",
      content: `Analyze this transaction:
      ${JSON.stringify(tx, null, 2)}
      
      Provide insights about:
      1. Transaction type and purpose
      2. Gas usage efficiency
      3. Contract interaction patterns
      4. Notable characteristics`,
    },
  ];

  const response = await llm.complete({
    messages,
    max_tokens: 500,
  });

  return response.content;
}

async function analyzeBlocks(blocks: any[], llm: LLMProvider): Promise<string> {
  const messages: LLMMessage[] = [
    {
      role: "system",
      content: "You are an AI assistant analyzing StarkNet blockchain data.",
    },
    {
      role: "user",
      content: `Analyze these blocks:
      ${JSON.stringify(blocks, null, 2)}
      
      Provide insights about:
      1. Block production patterns
      2. Transaction density
      3. Network activity trends
      4. Notable characteristics`,
    },
  ];

  const response = await llm.complete({
    messages,
    max_tokens: 500,
  });

  return response.content;
}

async function analyzeEvents(events: any[], llm: LLMProvider): Promise<string> {
  const messages: LLMMessage[] = [
    {
      role: "system",
      content: "You are an AI assistant analyzing StarkNet blockchain data.",
    },
    {
      role: "user",
      content: `Analyze these events:
      ${JSON.stringify(events, null, 2)}
      
      Provide insights about:
      1. Event patterns and frequency
      2. Contract interaction types
      3. Notable characteristics
      4. Potential implications`,
    },
  ];

  const response = await llm.complete({
    messages,
    max_tokens: 500,
  });

  return response.content;
}

async function analyzeContractMetrics(
  stats: any,
  volume: string,
  llm: LLMProvider
): Promise<string> {
  const messages: LLMMessage[] = [
    {
      role: "system",
      content: "You are an AI assistant analyzing StarkNet blockchain data.",
    },
    {
      role: "user",
      content: `Analyze these contract metrics:
      Stats: ${JSON.stringify(stats, null, 2)}
      Volume: ${volume}
      
      Provide insights about:
      1. Usage patterns
      2. Volume trends
      3. User activity
      4. Performance metrics`,
    },
  ];

  const response = await llm.complete({
    messages,
    max_tokens: 500,
  });

  return response.content;
}

async function analyzeNFTActivity(
  contract: any,
  transfers: any[],
  llm: LLMProvider
): Promise<string> {
  const messages: LLMMessage[] = [
    {
      role: "system",
      content: "You are an AI assistant analyzing StarkNet blockchain data.",
    },
    {
      role: "user",
      content: `Analyze this NFT activity:
      Contract: ${JSON.stringify(contract, null, 2)}
      Transfers: ${JSON.stringify(transfers, null, 2)}
      
      Provide insights about:
      1. Trading patterns
      2. Market trends
      3. Holder behavior
      4. Notable activities`,
    },
  ];

  const response = await llm.complete({
    messages,
    max_tokens: 500,
  });

  return response.content;
}

async function analyzeMessages(
  l2ToL1Messages: any[],
  l1ToL2Messages: any[],
  llm: LLMProvider
): Promise<string> {
  const messages: LLMMessage[] = [
    {
      role: "system",
      content: "You are an AI assistant analyzing StarkNet blockchain data.",
    },
    {
      role: "user",
      content: `Analyze these bridge messages:
      L2->L1: ${JSON.stringify(l2ToL1Messages, null, 2)}
      L1->L2: ${JSON.stringify(l1ToL2Messages, null, 2)}
      
      Provide insights about:
      1. Message patterns
      2. Cross-layer interactions
      3. Bridge usage trends
      4. Notable characteristics`,
    },
  ];

  const response = await llm.complete({
    messages,
    max_tokens: 500,
  });

  return response.content;
}
