import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(GamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return games data correctly', () => {
    const mockGames = [
      { id: 1, name: 'Catan', description: 'Juego de estrategia', price: 29900, image: '', category: 'Estrategia', players: '3-4' },
      { id: 2, name: 'Dixit', description: 'Juego de creatividad', price: 25000, image: '', category: 'Familiar', players: '3-6' }
    ];

    service.getGames().subscribe(games => {
      expect(games.length).toBe(2);
      expect(games[0].name).toBe('Catan');
      expect(games[1].name).toBe('Dixit');
    });

    const req = httpMock.expectOne('https://6a55b06be49d9eb2cc55ec31.mockapi.io/games');
    expect(req.request.method).toBe('GET');
    req.flush(mockGames);
  });
});
