import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private readonly apiUrl = 'https://6a55b06be49d9eb2cc55ec31.mockapi.io/games';

  constructor(private readonly http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl).pipe(
      map(games => games.map(game => ({ ...game, id: Number(game.id) }))),
      catchError(() => {
        console.error('Error al obtener juegos.');
        return of([]);
      })
    );
  }

  getGameById(id: number): Observable<Game | undefined> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`).pipe(
      map(game => ({ ...game, id: Number(game.id) })),
      catchError(() => {
        console.error('Error al obtener el juego.');
        return of(undefined);
      })
    );
  }

  addGame(game: Omit<Game, 'id'>): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game).pipe(
      map(created => ({ ...created, id: Number(created.id) })),
      catchError(error => {
        console.error('Error al agregar juego:', error);
        throw error;
      })
    );
  }

  updateGame(id: number, game: Partial<Game>): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}/${id}`, game).pipe(
      map(updated => ({ ...updated, id: Number(updated.id) })),
      catchError(error => {
        console.error('Error al actualizar juego:', error);
        throw error;
      })
    );
  }

  deleteGame(id: number): Observable<Game> {
    return this.http.delete<Game>(`${this.apiUrl}/${id}`).pipe(
      map(deleted => ({ ...deleted, id: Number(deleted.id) })),
      catchError(error => {
        console.error('Error al eliminar juego:', error);
        throw error;
      })
    );
  }
}
