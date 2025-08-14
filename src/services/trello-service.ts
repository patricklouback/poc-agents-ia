import axios from 'axios';
import { trelloConfig, validateTrelloConfig } from '../config/trello-config';

export interface TrelloBoard {
  id: string;
  name: string;
  desc: string;
  closed: boolean;
  url: string;
}

export interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  closed: boolean;
  idList: string;
  idBoard: string;
  url: string;
  due: string | null;
  labels: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  members: Array<{
    id: string;
    fullName: string;
    username: string;
  }>;
}

export interface TrelloList {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
}

export class TrelloService {
  private baseUrl: string;
  private apiKey: string;
  private token: string;

  constructor() {
    if (!validateTrelloConfig()) {
      throw new Error('Configuração do Trello inválida');
    }

    this.baseUrl = trelloConfig.baseUrl;
    this.apiKey = trelloConfig.apiKey;
    this.token = trelloConfig.token;
  }

  private getAuthParams(): string {
    return `key=${this.apiKey}&token=${this.token}`;
  }

  /**
   * Lista todos os boards do usuário
   */
  async getBoards(): Promise<TrelloBoard[]> {
    try {
      const response = await axios.get<TrelloBoard[]>(
        `${this.baseUrl}/members/me/boards?${this.getAuthParams()}`
      );
      
      console.log(`📋 Encontrados ${response.data.length} boards`);
      return response.data.filter((board: TrelloBoard) => !board.closed);
    } catch (error) {
      console.error('❌ Erro ao buscar boards:', error);
      throw new Error('Falha ao buscar boards do Trello');
    }
  }

  /**
   * Busca todos os cards de um board específico
   */
  async getCardsByBoard(boardId: string): Promise<TrelloCard[]> {
    try {
      const response = await axios.get<TrelloCard[]>(
        `${this.baseUrl}/boards/${boardId}/cards?${this.getAuthParams()}`
      );
      
      console.log(`📝 Encontrados ${response.data.length} cards no board ${boardId}`);
      return response.data.filter((card: TrelloCard) => !card.closed);
    } catch (error) {
      console.error('❌ Erro ao buscar cards:', error);
      throw new Error('Falha ao buscar cards do board');
    }
  }

  /**
   * Busca as listas de um board
   */
  async getListsByBoard(boardId: string): Promise<TrelloList[]> {
    try {
      const response = await axios.get<TrelloList[]>(
        `${this.baseUrl}/boards/${boardId}/lists?${this.getAuthParams()}`
      );
      
      console.log(`📋 Encontradas ${response.data.length} listas no board ${boardId}`);
      return response.data.filter((list: TrelloList) => !list.closed);
    } catch (error) {
      console.error('❌ Erro ao buscar listas:', error);
      throw new Error('Falha ao buscar listas do board');
    }
  }

  /**
   * Busca informações detalhadas de um board
   */
  async getBoardDetails(boardId: string): Promise<TrelloBoard & { lists: TrelloList[], cards: TrelloCard[] }> {
    try {
      const [boardResponse, listsResponse, cardsResponse] = await Promise.all([
        axios.get<TrelloBoard>(`${this.baseUrl}/boards/${boardId}?${this.getAuthParams()}`),
        this.getListsByBoard(boardId),
        this.getCardsByBoard(boardId)
      ]);

      return {
        ...boardResponse.data,
        lists: listsResponse,
        cards: cardsResponse
      };
    } catch (error) {
      console.error('❌ Erro ao buscar detalhes do board:', error);
      throw new Error('Falha ao buscar detalhes do board');
    }
  }
}
