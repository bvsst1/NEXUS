import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';
import { CartService } from '../../services/cart.service';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  readonly games = this.catalogService.games;
  addedMessage = '';

  constructor(
    private readonly catalogService: CatalogService,
    private readonly cartService: CartService
  ) {}

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
