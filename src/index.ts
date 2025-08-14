import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { AIFactory } from './services/ai-factory';

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

    const aiService = AIFactory.getService();
    
    let response;
    if (aiService.constructor.name === 'OpenAIService') {
      response = await (aiService as any).processTaskMessage(message);
    } else {
      response = await aiService.sendMessage([
        { role: 'user', content: message }
      ]);
    }
    
    return res.json({
      success: response.success,
      response: response.content,
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor Express rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
  console.log(`💬 Chat do Agente: http://localhost:${PORT}/chat`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
