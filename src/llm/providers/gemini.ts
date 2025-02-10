import axios from "axios";
import {
  LLMProvider,
  LLMRequestParams,
  LLMResponse,
  GeminiConfig,
} from "../../types/llm";

export class GeminiProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly defaultModel: string;
  private readonly baseUrl: string;
  private readonly projectId?: string;

  constructor(config: GeminiConfig) {
    this.apiKey = config.apiKey;
    this.defaultModel = config.defaultModel || "gemini-pro";
    this.projectId = config.projectId;
    this.baseUrl =
      config.baseUrl || "https://generativelanguage.googleapis.com/v1";
  }

  async complete(params: LLMRequestParams): Promise<LLMResponse> {
    try {
      // Convert messages to Gemini format
      const contents = params.messages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        parts: [{ text: msg.content }],
      }));

      const response = await axios.post(
        `${this.baseUrl}/models/${params.model || this.defaultModel}:generateContent`,
        {
          contents,
          generationConfig: {
            temperature: params.temperature,
            maxOutputTokens: params.max_tokens,
            topP: params.top_p,
          },
        },
        {
          params: {
            key: this.apiKey,
            ...(this.projectId && { project_id: this.projectId }),
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return {
        content: response.data.candidates[0].content.parts[0].text,
        model: params.model || this.defaultModel,
        usage: {
          // Gemini doesn't provide token counts in the same way
          total_tokens: response.data.usageMetadata?.totalTokens,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
      }
      throw error;
    }
  }

  getDefaultModel(): string {
    return this.defaultModel;
  }
}
