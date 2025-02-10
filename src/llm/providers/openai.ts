import axios from "axios";
import {
  LLMProvider,
  LLMRequestParams,
  LLMResponse,
  OpenAIConfig,
} from "../../types/llm";

export class OpenAIProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly defaultModel: string;
  private readonly baseUrl: string;
  private readonly organization?: string;

  constructor(config: OpenAIConfig) {
    this.apiKey = config.apiKey;
    this.defaultModel = config.defaultModel || "gpt-4-turbo-preview";
    this.baseUrl = config.baseUrl || "https://api.openai.com/v1";
    this.organization = config.organization;
  }

  async complete(params: LLMRequestParams): Promise<LLMResponse> {
    try {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      };

      if (this.organization) {
        headers["OpenAI-Organization"] = this.organization;
      }

      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: params.model || this.defaultModel,
          messages: params.messages,
          temperature: params.temperature,
          max_tokens: params.max_tokens,
          top_p: params.top_p,
          frequency_penalty: params.frequency_penalty,
          presence_penalty: params.presence_penalty,
        },
        { headers }
      );

      return {
        content: response.data.choices[0].message.content,
        model: response.data.model,
        usage: response.data.usage,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI API Error: ${error.message}`);
      }
      throw error;
    }
  }

  getDefaultModel(): string {
    return this.defaultModel;
  }
}
