import axios from "axios";
import { OpenRouterConfig } from "../types";

export class OpenRouterClient {
  private apiKey: string;
  private defaultModel: string;
  private baseUrl = "https://openrouter.ai/api/v1";

  constructor(config: OpenRouterConfig) {
    this.apiKey = config.apiKey;
    this.defaultModel = config.defaultModel || "anthropic/claude-3-opus";
  }

  async complete(params: {
    prompt: string;
    model?: string;
    max_tokens?: number;
    temperature?: number;
  }): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: params.model || this.defaultModel,
          messages: [{ role: "user", content: params.prompt }],
          max_tokens: params.max_tokens,
          temperature: params.temperature,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "HTTP-Referer": "https://starknet-ai-agent.dev",
            "X-Title": "StarkNet AI Agent SDK",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`OpenRouter API Error: ${error.message}`);
    }
  }
}
