import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';
import { CartService } from '../../services/cart.service';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  readonly games = signal<Game[]>([]);
  addedMessage = '';

  constructor(
    private readonly gamesService: GamesService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.gamesService.getGames().subscribe({
      next: (games) => this.games.set(games),
      error: () => console.error('Error al cargar los juegos.')
    });
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(value);
  }

  addToCart(game: Game): void {
    this.cartService.addToCart(game);
    this.addedMessage = `${game.name} fue agregado al carrito.`;
  }
}
