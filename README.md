# POC Agents IA

Projeto Node.js com TypeScript para desenvolvimento de agentes de IA com arquitetura desacoplada.

## 🤖 Agente de Tarefas - Trello

Este projeto inclui um agente inteligente para ajudar na organização e priorização de tarefas do Trello. O agente pode:

- 📋 **Resumir tarefas** - Visualizar todas as tarefas organizadas por status
- 🎯 **Priorizar inteligentemente** - Organizar por importância e dependências
- 🐛 **Analisar bugs críticos** - Focar no que é urgente
- 📊 **Organizar por dependências** - Entender o impacto das tarefas

## 🏗️ Arquitetura Desacoplada

O projeto utiliza uma arquitetura modular que permite trocar facilmente entre diferentes provedores de IA:

### **📁 Estrutura de Serviços:**

```
src/
├── services/
│   ├── ai-service.ts      # Interface abstrata para serviços de IA
│   ├── openai-service.ts  # Implementação específica da OpenAI
│   └── ai-factory.ts      # Factory para instanciar serviços
├── config/
│   ├── openai-config.ts   # Configuração da OpenAI
│   └── ai-setup.ts        # Configurações pré-definidas
└── index.ts               # Servidor principal
```

### **🔌 Serviços Disponíveis:**

- **OpenAI Service** - Integração real com GPT-3.5/GPT-4
- **Mock Service** - Serviço simulado para desenvolvimento/testes

### **⚙️ Configuração Simples:**

```typescript
// No arquivo ai-factory.ts, linha 8:
private static defaultServiceType: AIServiceType = 'mock'; // Mude para 'openai' quando quiser

// Ou use o AISetup para configurações pré-definidas:
import { AISetup } from './config/ai-setup';

// Para desenvolvimento (Mock)
AISetup.setupForDevelopment();

// Para produção (OpenAI)
AISetup.setupForProduction();

// Para testes
AISetup.setupForTesting();
```

## 🚀 Scripts Disponíveis

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento com hot reload
npm run dev

# Compilar TypeScript para JavaScript
npm run build

# Compilar TypeScript em modo watch
npm run build:watch
```

### Produção
```bash
# Executar aplicação compilada
npm start

# Limpar pasta dist
npm run clean
```

## 📁 Estrutura do Projeto

```
poc-agents-ia/
├── src/                    # Código fonte TypeScript
│   ├── services/          # Serviços de IA
│   ├── config/            # Configurações
│   └── index.ts           # Servidor principal
├── public/                # Arquivos estáticos
│   └── chat.html          # Interface de chat
├── dist/                  # Código compilado
├── tsconfig.json          # Configuração TypeScript
├── nodemon.json           # Configuração Nodemon
└── package.json           # Dependências e scripts
```

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem
- **Express** - Framework web
- **OpenAI** - Integração com IA
- **ts-node** - Execução direta de TypeScript
- **nodemon** - Hot reload para desenvolvimento

## 🔧 Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente (opcional):
```bash
# Copie o arquivo de exemplo
cp env.example .env

# Edite o arquivo .env com suas configurações
OPENAI_API_KEY=sua_chave_api_aqui
```

3. Configure o tipo de IA (no código):
```typescript
// Em src/services/ai-factory.ts, linha 8:
private static defaultServiceType: AIServiceType = 'mock'; // ou 'openai'
```

4. Inicie o desenvolvimento:
```bash
npm run dev
```

5. Acesse as URLs:
- **Servidor:** http://localhost:3000
- **Chat do Agente:** http://localhost:3000/chat
- **Health Check:** http://localhost:3000/health

## 💬 Como Usar o Agente

1. Acesse http://localhost:3000/chat
2. Use os botões de sugestão ou digite suas perguntas:
   - "Me dê um resumo das minhas tarefas"
   - "Priorize minhas tarefas por importância"
   - "Quais são os bugs críticos?"
   - "Organize por dependências"

## 🔌 Endpoints da API

### POST /api/agent/tasks
Envia uma mensagem para o agente de tarefas.

**Request:**
```json
{
  "message": "Me dê um resumo das minhas tarefas"
}
```

**Response:**
```json
{
  "success": true,
  "response": "📋 Resumo das suas tarefas...",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET /health
Verifica o status da API.

### GET /chat
Interface web para conversar com o agente.

## 🔄 Trocar Provedor de IA

### **Método 1: Alterar no código (Recomendado)**
```typescript
// Em src/services/ai-factory.ts, linha 8:
private static defaultServiceType: AIServiceType = 'openai'; // Mude aqui
```

### **Método 2: Usar AISetup**
```typescript
import { AISetup } from './config/ai-setup';

// No início do seu app (index.ts):
AISetup.setupForProduction(); // Para OpenAI
AISetup.setupForDevelopment(); // Para Mock
```

### **Método 3: Configuração manual**
```typescript
import { AIFactory } from './services/ai-factory';
import { OpenAIService } from './services/openai-service';
import { OpenAIConfigService } from './config/openai-config';

// Configurar OpenAI manualmente
const config = new OpenAIConfigService();
const openaiService = new OpenAIService(config);
AIFactory.setService(openaiService);
```

## 📝 Próximos Passos

- [ ] Integração real com API do Trello
- [ ] Análise de dependências entre tarefas
- [ ] Notificações inteligentes
- [ ] Histórico de conversas
- [ ] Personalização de prioridades
- [ ] Suporte a outros provedores de IA (Claude, Gemini)

## 📝 Notas

- O servidor roda na porta 3000 por padrão
- Use `npm run dev` para desenvolvimento com hot reload
- Use `npm run build` para compilar para produção
- O código compilado fica na pasta `dist/`
- Por padrão, usa o serviço Mock para desenvolvimento
- Configure `OPENAI_API_KEY` e mude `defaultServiceType` para 'openai' para usar a OpenAI real
