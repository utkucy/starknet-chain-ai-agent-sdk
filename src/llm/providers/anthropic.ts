import axios from "axios";
import {
  LLMProvider,
  LLMRequestParams,
  LLMResponse,
  AnthropicConfig,
} from "../../types/llm";

export class AnthropicProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly defaultModel: string;
  private readonly baseUrl: string;
  private readonly version: string;

  constructor(config: AnthropicConfig) {
    this.apiKey = config.apiKey;
    this.defaultModel = config.defaultModel || "claude-3-opus-20240229";
    this.baseUrl = config.baseUrl || "https://api.anthropic.com/v1";
    this.version = config.version || "2024-02-29";
  }

  async complete(params: LLMRequestParams): Promise<LLMResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/messages`,
        {
          model: params.model || this.defaultModel,
          messages: params.messages,
          max_tokens: params.max_tokens,
          temperature: params.temperature,
          top_p: params.top_p,
        },
        {
          headers: {
            "x-api-key": this.apiKey,
            "anthropic-version": this.version,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        content: response.data.content[0].text,
        model: response.data.model,
        usage: {
          prompt_tokens: response.data.usage?.input_tokens,
          completion_tokens: response.data.usage?.output_tokens,
          total_tokens:
            (response.data.usage?.input_tokens || 0) +
            (response.data.usage?.output_tokens || 0),
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Anthropic API Error: ${error.message}`);
      }
      throw error;
    }
  }

  getDefaultModel(): string {
    return this.defaultModel;
  }
}
