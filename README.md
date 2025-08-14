# POC Agents IA

Projeto Node.js com TypeScript para desenvolvimento de agentes de IA.

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
│   └── index.ts   # Arquivo principal
├── dist/          # Código compilado (gerado automaticamente)
├── tsconfig.json  # Configuração TypeScript
├── nodemon.json   # Configuração Nodemon
└── package.json   # Dependências e scripts
```

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem
- **ts-node** - Execução direta de TypeScript
- **nodemon** - Hot reload para desenvolvimento

## 🔧 Configuração

1. Instale as dependências:
```bash
npm install
```

2. Inicie o desenvolvimento:
```bash
npm run dev
```

3. Acesse: http://localhost:3000

## 📝 Notas

- O servidor roda na porta 3000 por padrão
- Use `npm run dev` para desenvolvimento com hot reload
- Use `npm run build` para compilar para produção
- O código compilado fica na pasta `dist/`
