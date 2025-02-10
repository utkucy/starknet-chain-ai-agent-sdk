import { StarkScanClient } from "./clients/starkscan";
import { MemorySystem } from "./memory";
import { initializeTools } from "./tools";
import { StarkScanConfig } from "./types";
import { LLMOptions, LLMProvider, LLMMessage } from "./types/llm";
import { LLMFactory } from "./llm/factory";

export class StarknetChainAIAgent {
  private readonly starkScan: StarkScanClient;
  private readonly llm: LLMProvider;
  private readonly tools: Map<string, any>;
  private readonly memory: MemorySystem;

  constructor(config: { starkScan: StarkScanConfig; llm: LLMOptions }) {
    this.starkScan = new StarkScanClient(config.starkScan);
    this.llm = LLMFactory.createProvider(config.llm);
    this.memory = new MemorySystem();
    this.tools = initializeTools(this.starkScan, this.llm);
  }

  async process(query: string, context?: Record<string, any>): Promise<string> {
    try {
      // Get relevant context from memory
      const memoryContext = await this.memory.getRelevantContext(query);

      // Determine required tools and analysis steps
      const plan = await this.createAnalysisPlan(query, memoryContext);

      // Execute analysis plan
      const results = await this.executeAnalysisPlan(plan);

      // Synthesize results
      const response = await this.synthesizeResponse(results, query);

      // Store in memory
      this.memory.addEntry({
        query,
        results,
        response,
        timestamp: Date.now(),
      });

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Processing error: ${error.message}`);
      }
      throw error;
    }
  }

  private async createAnalysisPlan(query: string, context: any): Promise<any> {
    const messages: LLMMessage[] = [
      {
        role: "system",
        content:
          "You are an AI assistant helping to analyze StarkNet blockchain data.",
      },
      {
        role: "user",
        content: `Given this query about StarkNet: "${query}"
        And this context: ${JSON.stringify(context)}
        
        Create an analysis plan that:
        1. Identifies required data from StarkScan
        2. Determines analysis steps
        3. Specifies tools to use
        
        Available tools: ${Array.from(this.tools.keys()).join(", ")}
        
        Return the plan in JSON format.`,
      },
    ];

    const response = await this.llm.complete({
      messages,
      max_tokens: 500,
    });

    return JSON.parse(response.content);
  }

  private async executeAnalysisPlan(plan: any): Promise<any[]> {
    const results = [];
    for (const step of plan.steps) {
      const tool = this.tools.get(step.tool);
      if (tool) {
        const result = await tool.execute(step.params);
        results.push(result);
      }
    }
    return results;
  }

  private async synthesizeResponse(
    results: any[],
    query: string
  ): Promise<string> {
    const messages: LLMMessage[] = [
      {
        role: "system",
        content:
          "You are an AI assistant helping to analyze StarkNet blockchain data.",
      },
      {
        role: "user",
        content: `Given these analysis results: ${JSON.stringify(results)}
        And the original query: "${query}"
        
        Synthesize a clear, informative response that:
        1. Directly answers the query
        2. Highlights key insights
        3. Provides actionable conclusions`,
      },
    ];

    const response = await this.llm.complete({
      messages,
      max_tokens: 750,
    });

    return response.content;
  }
}

// Export types
export * from "./types/llm";
export * from "./types";
