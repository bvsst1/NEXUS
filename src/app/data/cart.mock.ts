import { GAMES_MOCK } from './games.mock';
import { CartItem } from '../models/cart-item.model';

export const CART_MOCK: CartItem[] = [
  {
    productId: 1,
    quantity: 1,
    product: GAMES_MOCK[0]
  },
  {
    productId: 3,
    quantity: 2,
    product: GAMES_MOCK[2]
  }
];
