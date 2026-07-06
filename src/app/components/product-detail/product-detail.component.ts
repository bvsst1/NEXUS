import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';
import { CartService } from '../../services/cart.service';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  game?: Game;
  feedbackMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gamesService: GamesService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.gamesService.getGameById(id).subscribe({
        next: (game) => this.game = game,
        error: () => console.error('Error al cargar el juego.')
      });
    });
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(value);
  }

  addToCart(): void {
    if (!this.game) {
      return;
    }

    this.cartService.addToCart(this.game);
    this.feedbackMessage = `${this.game.name} fue agregado al carrito.`;
  }
}
