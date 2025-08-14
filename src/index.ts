console.log('🚀 Projeto Node.js com TypeScript configurado com sucesso!');

interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'Patrick Louback',
  email: 'patrick@example.com'
};

console.log('👤 Usuário:', user);

// Função de exemplo
function greetUser(user: User): string {
  return `Olá, ${user.name}! Seu email é ${user.email}`;
}

console.log(greetUser(user));

// Servidor básico para testar
import * as http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'API funcionando!',
    user: user,
    timestamp: new Date().toISOString()
  }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
});
