import axios from "axios";
import {
  LLMProvider,
  LLMRequestParams,
  LLMResponse,
  OpenRouterConfig,
} from "../../types/llm";

export class OpenRouterProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly defaultModel: string;
  private readonly baseUrl: string;
  private readonly modelPreferences?: OpenRouterConfig["modelPreferences"];

  constructor(config: OpenRouterConfig) {
    this.apiKey = config.apiKey;
    this.defaultModel = config.defaultModel || "anthropic/claude-3-opus";
    this.baseUrl = config.baseUrl || "https://openrouter.ai/api/v1";
    this.modelPreferences = config.modelPreferences;
  }

  async complete(params: LLMRequestParams): Promise<LLMResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: params.model || this.defaultModel,
          messages: params.messages,
          temperature: params.temperature,
          max_tokens: params.max_tokens,
          top_p: params.top_p,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "HTTP-Referer": "https://starknet-ai-agent.dev",
            "X-Title": "StarkNet AI Agent SDK",
          },
        }
      );

      return {
        content: response.data.choices[0].message.content,
        model: response.data.model,
        usage: response.data.usage,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenRouter API Error: ${error.message}`);
      }
      throw error;
    }
  }

  getDefaultModel(): string {
    return this.defaultModel;
  }

  // Helper method to get the appropriate model based on task type
  getModelForTask(
    taskType: keyof OpenRouterConfig["modelPreferences"]
  ): string {
    return this.modelPreferences?.[taskType] || this.defaultModel;
  }
}
