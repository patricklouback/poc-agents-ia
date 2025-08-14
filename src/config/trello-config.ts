export interface TrelloConfig {
  apiKey: string;
  token: string;
  baseUrl: string;
}

export const trelloConfig: TrelloConfig = {
  apiKey: process.env.TRELLO_API_KEY || '',
  token: process.env.TRELLO_TOKEN || '',
  baseUrl: 'https://api.trello.com/1'
};

export const validateTrelloConfig = (): boolean => {
  if (!trelloConfig.apiKey || !trelloConfig.token) {
    console.error('❌ Configuração do Trello incompleta. Verifique TRELLO_API_KEY e TRELLO_TOKEN no .env');
    return false;
  }
  return true;
};
