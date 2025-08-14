import OpenAI from 'openai';
import { AIService, AIMessage, AIResponse } from './ai-service';
import { OpenAIConfigService } from '../config/openai-config';

export class OpenAIService extends AIService {
  private openai: OpenAI;
  private config: OpenAIConfigService;

  constructor(config: OpenAIConfigService) {
    super();
    this.config = config;
    
    if (!this.config.validateConfig()) {
      throw new Error('OpenAI configuration is invalid. Please check your API key and model settings.');
    }

    this.openai = new OpenAI({
      apiKey: this.config.getApiKey(),
    });
  }

  async sendMessage(messages: AIMessage[]): Promise<AIResponse> {
    try {
      const systemPrompt = this.config.getSystemPrompt();
      const messagesWithSystem = systemPrompt && !messages.some(m => m.role === 'system') 
        ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
        : messages;

      const completion = await this.openai.chat.completions.create({
        model: this.config.getModel(),
        messages: messagesWithSystem.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        max_tokens: this.config.getConfig().maxTokens,
        temperature: this.config.getConfig().temperature,
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        return {
          content: 'Desculpe, não consegui gerar uma resposta.',
          success: false,
          error: 'Empty response from OpenAI'
        };
      }

      return {
        content: response,
        success: true
      };

    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      return {
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async processTaskMessage(userMessage: string): Promise<AIResponse> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: `Você é um agente especializado em organização e priorização de tarefas do Trello. 
        
Suas principais funções são:
- Analisar e resumir tarefas
- Priorizar por importância e urgência
- Identificar dependências entre tarefas
- Sugerir ordem de execução
- Analisar bugs críticos

Seja conciso, prático e use emojis para tornar as respostas mais amigáveis.`
      },
      {
        role: 'user',
        content: userMessage
      }
    ];

    return this.sendMessage(messages);
  }
}
