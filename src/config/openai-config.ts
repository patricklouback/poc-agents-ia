export interface OpenAIConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  systemPrompt?: string;
}

export class OpenAIConfigService {
  private config: OpenAIConfig;

  constructor(config?: Partial<OpenAIConfig>) {
    this.config = {
      apiKey: process.env.OPENAI_API_KEY || '',
      model: 'gpt-4.1-nano',
      maxTokens: 1000,
      temperature: 0.7,
      systemPrompt: 'Você é um assistente de tarefas especializado em organização e priorização de projetos. Seja conciso e prático em suas respostas.',
      ...config
    };
  }

  getConfig(): OpenAIConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<OpenAIConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  validateConfig(): boolean {
    return !!(this.config.apiKey && this.config.model);
  }

  getApiKey(): string {
    return this.config.apiKey;
  }

  getModel(): string {
    return this.config.model;
  }

  getSystemPrompt(): string {
    return this.config.systemPrompt || '';
  }
}
