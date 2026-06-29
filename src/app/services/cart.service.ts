import { Injectable, computed, signal } from '@angular/core';
import { CART_MOCK } from '../data/cart.mock';
import { CartItem } from '../models/cart-item.model';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'nexus-cart';
  private readonly cartState = signal<CartItem[]>(this.loadCart());

  readonly items = computed(() => this.cartState());
  readonly subtotal = computed(() =>
    this.cartState().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );
  readonly totalItems = computed(() => this.cartState().reduce((sum, item) => sum + item.quantity, 0));

  addToCart(product: Game): void {
    const existingItem = this.cartState().find((item) => item.productId === product.id);

    const updatedCart = existingItem
      ? this.cartState().map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...this.cartState(), { productId: product.id, quantity: 1, product }];

    this.updateCart(updatedCart);
  }

  removeItem(productId: number): void {
    const updatedCart = this.cartState().filter((item) => item.productId !== productId);
    this.updateCart(updatedCart);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  private loadCart(): CartItem[] {
    const storedCart = this.readStorage();

    if (!storedCart) {
      this.persist(CART_MOCK);
      return [...CART_MOCK];
    }

    try {
      return JSON.parse(storedCart) as CartItem[];
    } catch {
      this.persist(CART_MOCK);
      return [...CART_MOCK];
    }
  }

  private updateCart(items: CartItem[]): void {
    this.cartState.set(items);

    this.persist(items);
  }

  private persist(items: CartItem[]): void {
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
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
