export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  success: boolean;
  error?: string;
}

export abstract class AIService {
  abstract sendMessage(messages: AIMessage[]): Promise<AIResponse>;
  
  protected formatMessages(messages: AIMessage[]): string {
    return messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
  }
  
  protected validateMessage(message: string): boolean {
    return message ? message.trim().length > 0 : false;
  }
}
