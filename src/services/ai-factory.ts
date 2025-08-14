import { AIService } from './ai-service';
import { OpenAIService } from './openai-service';
import { OpenAIConfigService } from '../config/openai-config';

export type AIServiceType = 'openai' | 'mock';

export class AIFactory {
  private static instance: AIService | null = null;
  private static defaultServiceType: AIServiceType = process.env.TYPE_IA as AIServiceType || 'mock';

  static getService(): AIService {
    if (!this.instance) {
      this.instance = this.createService(this.defaultServiceType);
    }
    return this.instance;
  }

  static setService(service: AIService): void {
    this.instance = service;
  }

  static resetToDefault(): void {
    this.instance = null;
  }

  private static createService(type: AIServiceType): AIService {
    switch (type) {
      case 'openai':
        const config = new OpenAIConfigService();
        return new OpenAIService(config);
      
      case 'mock':
        return new MockAIService();
      
      default:
        throw new Error(`Unknown AI service type: ${type}`);
    }
  }
}

class MockAIService extends AIService {
  async sendMessage(messages: any[]): Promise<any> {
    const lastMessage = messages[messages.length - 1]?.content || '';
    const lowerMessage = lastMessage.toLowerCase();
    
    if (lowerMessage.includes('resumo') || lowerMessage.includes('tarefas')) {
      return {
        content: `📋 **Resumo das suas tarefas no Trello:**
        
🟡 **Em Andamento (3 tarefas):**
- Implementar autenticação OAuth
- Revisar pull request #123
- Preparar apresentação para reunião

🟢 **Próximas (5 tarefas):**
- Atualizar documentação da API
- Testar integração com webhook
- Configurar ambiente de staging

🔴 **Críticas (2 tarefas):**
- Corrigir bug de login (cliente reportou)
- Resolver problema de performance

💡 **Sugestão:** Foque primeiro nas tarefas críticas, especialmente o bug de login que afeta clientes.`,
        success: true
      };
    }
    
    if (lowerMessage.includes('priorizar') || lowerMessage.includes('organizar')) {
      return {
        content: `🎯 **Priorização sugerida para suas tarefas:**

**🔥 CRÍTICO (Faça primeiro):**
1. Corrigir bug de login - Cliente reportou problema
2. Resolver problema de performance - Afeta todos os usuários

**⚡ IMPORTANTE (Esta semana):**
3. Implementar autenticação OAuth - Bloqueia outras funcionalidades
4. Revisar pull request #123 - Time aguardando feedback
5. Preparar apresentação para reunião - Deadline amanhã

**📝 NORMAL (Próximas semanas):**
6. Atualizar documentação da API
7. Testar integração com webhook
8. Configurar ambiente de staging

**💡 Dica:** As tarefas críticas têm dependências de outras pessoas, então resolva-as primeiro para não bloquear o time.`,
        success: true
      };
    }
    
    if (lowerMessage.includes('bug') || lowerMessage.includes('crítico')) {
      return {
        content: `🐛 **Análise de Bugs Críticos:**

**Bug de Login (URGENTE):**
- **Impacto:** Clientes não conseguem acessar o sistema
- **Usuários afetados:** ~150 usuários ativos
- **Tempo estimado:** 2-3 horas
- **Prioridade:** 🔴 CRÍTICA

**Problema de Performance:**
- **Impacto:** Sistema lento para todos os usuários
- **Usuários afetados:** Todos (~500 usuários)
- **Tempo estimado:** 4-6 horas
- **Prioridade:** 🔴 CRÍTICA

**Recomendação:** Resolva o bug de login primeiro, pois é mais rápido e resolve um problema específico. Depois foque na performance.`,
        success: true
      };
    }
    
    return {
      content: `🤖 **Olá! Sou seu agente de tarefas do Trello.**

Posso te ajudar com:
- 📋 **Resumo das tarefas** - Veja todas suas tarefas organizadas
- 🎯 **Priorização** - Organize por importância e dependências  
- 🐛 **Bugs críticos** - Foque no que é urgente
- 📊 **Análise de projetos** - Entenda o impacto das tarefas

Como posso te ajudar hoje?`,
      success: true
    };
  }
}
