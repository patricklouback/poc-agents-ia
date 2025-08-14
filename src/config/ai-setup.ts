import { AIFactory } from '../services/ai-factory';
import { OpenAIService } from '../services/openai-service';
import { OpenAIConfigService } from './openai-config';

export class AISetup {
  
  static setupForDevelopment(): void {
    AIFactory.resetToDefault();
    console.log('🤖 IA configurada para desenvolvimento (Mock)');
  }

  static setupForProduction(): void {
    try {
      const config = new OpenAIConfigService();
      const openaiService = new OpenAIService(config);
      AIFactory.setService(openaiService);
      console.log('🤖 IA configurada para produção (OpenAI)');
    } catch (error) {
      console.error('❌ Erro ao configurar OpenAI:', error);
      console.log('🔄 Mantendo configuração de desenvolvimento (Mock)');
    }
  }

  static setupCustom(service: any): void {
    AIFactory.setService(service);
    console.log('🤖 IA configurada com serviço customizado');
  }

  static setupForTesting(): void {
    AIFactory.resetToDefault();
    console.log('🤖 IA configurada para testes (Mock)');
  }
}
