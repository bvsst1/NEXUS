import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GamesService {
  constructor(private readonly http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('assets/data/games.json').pipe(
      catchError(() => {
        console.error('Error al cargar el catálogo de juegos.');
        return of([]);
      })
    );
  }

  getGameById(id: number): Observable<Game | undefined> {
    return this.getGames().pipe(
      map((games) => games.find((game) => game.id === id))
    );
  }
}
