import { Injectable, computed, signal } from '@angular/core';
import { GAMES_MOCK } from '../data/games.mock';
import { Game } from '../models/game.model';

export type ProductPayload = Omit<Game, 'id'>;

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly storageKey = 'nexus-games';
  private readonly gamesState = signal<Game[]>(this.loadGames());

  readonly games = computed(() => this.gamesState());

  getById(id: number): Game | undefined {
    return this.gamesState().find((game) => game.id === id);
  }

  saveProduct(payload: ProductPayload, editingId?: number | null): Game[] {
    const trimmedPayload: ProductPayload = {
      name: payload.name.trim(),
      description: payload.description.trim(),
      price: Number(payload.price),
      image: payload.image.trim(),
      category: payload.category.trim(),
      players: payload.players.trim()
    };

    const updatedGames = editingId
      ? this.gamesState().map((product) =>
          product.id === editingId ? { id: editingId, ...trimmedPayload } : product
        )
      : [...this.gamesState(), { id: Date.now(), ...trimmedPayload }];

    this.gamesState.set(updatedGames);
    this.persist(updatedGames);
    return updatedGames;
  }

  deleteProduct(productId: number): Game[] {
    const updatedGames = this.gamesState().filter((product) => product.id !== productId);
    this.gamesState.set(updatedGames);
    this.persist(updatedGames);
    return updatedGames;
  }

  private loadGames(): Game[] {
    const storedGames = this.readStorage();

    if (!storedGames) {
      this.persist(GAMES_MOCK);
      return [...GAMES_MOCK];
    }

    try {
      return JSON.parse(storedGames) as Game[];
    } catch {
      this.persist(GAMES_MOCK);
      return [...GAMES_MOCK];
    }
  }

  private persist(games: Game[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(games));
    } catch {
      // noop when storage is unavailable
    }
  }

  private readStorage(): string | null {
    try {
      return localStorage.getItem(this.storageKey);
    } catch {
      return null;
    }
  }
}
