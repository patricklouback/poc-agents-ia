import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando!',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/agent/tasks', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    const agentResponse = await processTaskMessage(message);
    
    return res.json({
      success: true,
      response: agentResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro no agente:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

app.get('/chat', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/chat.html'));
});

// Função para processar mensagens do agente (simulada por enquanto)
async function processTaskMessage(message: string): Promise<string> {
  const lowerMessage = message.toLowerCase();
  
  // Simulação de respostas baseadas no tipo de mensagem
  if (lowerMessage.includes('resumo') || lowerMessage.includes('tarefas')) {
    return `📋 **Resumo das suas tarefas no Trello:**
    
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

💡 **Sugestão:** Foque primeiro nas tarefas críticas, especialmente o bug de login que afeta clientes.`;
  }
  
  if (lowerMessage.includes('priorizar') || lowerMessage.includes('organizar')) {
    return `🎯 **Priorização sugerida para suas tarefas:**

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

**💡 Dica:** As tarefas críticas têm dependências de outras pessoas, então resolva-as primeiro para não bloquear o time.`;
  }
  
  if (lowerMessage.includes('bug') || lowerMessage.includes('crítico')) {
    return `🐛 **Análise de Bugs Críticos:**

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

**Recomendação:** Resolva o bug de login primeiro, pois é mais rápido e resolve um problema específico. Depois foque na performance.`;
  }
  
  return `🤖 **Olá! Sou seu agente de tarefas do Trello.**

Posso te ajudar com:
- 📋 **Resumo das tarefas** - Veja todas suas tarefas organizadas
- 🎯 **Priorização** - Organize por importância e dependências  
- 🐛 **Bugs críticos** - Foque no que é urgente
- 📊 **Análise de projetos** - Entenda o impacto das tarefas

Como posso te ajudar hoje?`;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor Express rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
  console.log(`💬 Chat do Agente: http://localhost:${PORT}/chat`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
