import { LLMProvider, LLMOptions, LLMConfig } from "../types/llm";
import { OpenAIProvider } from "./providers/openai";
import { AnthropicProvider } from "./providers/anthropic";
import { GeminiProvider } from "./providers/gemini";
import { OpenRouterProvider } from "./providers/openrouter";

export class LLMFactory {
  static createProvider(options: LLMOptions): LLMProvider {
    switch (options.provider) {
      case "openai":
        return new OpenAIProvider(options.config);
      case "anthropic":
        return new AnthropicProvider(options.config);
      case "gemini":
        return new GeminiProvider(options.config);
      case "openrouter":
        return new OpenRouterProvider(options.config);
      default:
        throw new Error(`Unsupported LLM provider: ${options.provider}`);
    }
  }
}
