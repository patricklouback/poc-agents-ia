# POC Agents IA

Projeto Node.js com TypeScript para desenvolvimento de agentes de IA.

## 🤖 Agente de Tarefas - Trello

Este projeto inclui um agente inteligente para ajudar na organização e priorização de tarefas do Trello. O agente pode:

- 📋 **Resumir tarefas** - Visualizar todas as tarefas organizadas por status
- 🎯 **Priorizar inteligentemente** - Organizar por importância e dependências
- 🐛 **Analisar bugs críticos** - Focar no que é urgente
- 📊 **Organizar por dependências** - Entender o impacto das tarefas

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
├── src/           # Código fonte TypeScript
│   └── index.ts   # Arquivo principal com servidor Express
├── public/        # Arquivos estáticos
│   └── chat.html  # Interface de chat do agente
├── dist/          # Código compilado (gerado automaticamente)
├── tsconfig.json  # Configuração TypeScript
├── nodemon.json   # Configuração Nodemon
└── package.json   # Dependências e scripts
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
# Crie um arquivo .env na raiz do projeto
OPENAI_API_KEY=sua_chave_api_aqui
```

3. Inicie o desenvolvimento:
```bash
npm run dev
```

4. Acesse as URLs:
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

## 📝 Próximos Passos

- [ ] Integração real com API do Trello
- [ ] Análise de dependências entre tarefas
- [ ] Notificações inteligentes
- [ ] Histórico de conversas
- [ ] Personalização de prioridades

## 📝 Notas

- O servidor roda na porta 3000 por padrão
- Use `npm run dev` para desenvolvimento com hot reload
- Use `npm run build` para compilar para produção
- O código compilado fica na pasta `dist/`
- Por enquanto, o agente usa dados simulados para demonstração
