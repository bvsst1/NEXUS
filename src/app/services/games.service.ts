import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private readonly baseUrl = 'https://nexus-boardgames-default-rtdb.firebaseio.com';

  constructor(private readonly http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Record<string, Game> | null>(`${this.baseUrl}/games.json`).pipe(
      map(data => {
        if (!data) return [];
        return Object.entries(data).map(([key, value]) => ({
          ...value,
          id: key as unknown as number
        }));
      }),
      catchError(() => {
        console.error('Error al obtener juegos.');
        return of([]);
      })
    );
  }

  getGameById(id: number): Observable<Game | undefined> {
    return this.http.get<Game | null>(`${this.baseUrl}/games/${id}.json`).pipe(
      map(data => (data ? { ...data, id } : undefined)),
      catchError(() => {
        console.error('Error al obtener el juego.');
        return of(undefined);
      })
    );
  }

  addGame(game: Omit<Game, 'id'>): Observable<Game> {
    return this.http.post<{ name: string }>(`${this.baseUrl}/games.json`, game).pipe(
      map(response => ({
        ...game,
        id: response.name as unknown as number
      })),
      catchError(error => {
        console.error('Error al agregar juego:', error);
        throw error;
      })
    );
  }

  updateGame(id: number, game: Partial<Game>): Observable<Game> {
    return this.http.patch<Partial<Game>>(`${this.baseUrl}/games/${id}.json`, game).pipe(
      map(() => ({ ...game, id } as Game)),
      catchError(error => {
        console.error('Error al actualizar juego:', error);
        throw error;
      })
    );
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/games/${id}.json`).pipe(
      catchError(error => {
        console.error('Error al eliminar juego:', error);
        throw error;
      })
    );
  }
}
