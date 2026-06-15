import { Game } from './game.model';

export interface CartItem {
  productId: number;
  quantity: number;
  product: Game;
}
