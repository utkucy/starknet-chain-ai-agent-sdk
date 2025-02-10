export interface LLMMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

export interface LLMConfig {
  apiKey: string;
  defaultModel?: string;
  organization?: string;
  baseUrl?: string;
}

export interface LLMRequestParams {
  messages: LLMMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

// Provider-specific configurations
export interface OpenAIConfig extends LLMConfig {
  organization?: string;
}

export interface AnthropicConfig extends LLMConfig {
  version?: string;
}

export interface GeminiConfig extends LLMConfig {
  projectId?: string;
}

export interface OpenRouterConfig extends LLMConfig {
  modelPreferences?: {
    reasoning?: string;
    analysis?: string;
    synthesis?: string;
  };
}

// Base LLM Provider Interface
export interface LLMProvider {
  complete(params: LLMRequestParams): Promise<LLMResponse>;
  getDefaultModel(): string;
}

export type LLMProviderType = "openai" | "anthropic" | "gemini" | "openrouter";

export interface LLMOptions {
  provider: LLMProviderType;
  config: LLMConfig;
}
