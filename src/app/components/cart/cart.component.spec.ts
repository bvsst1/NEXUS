import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { Game } from '../../models/game.model';
import { provideRouter } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    cartService.clearCart();
    fixture.detectChanges();
  });

  afterEach(() => {
    cartService.clearCart();
  });

  it('should calculate total of 2 products correctly', () => {
    const game1: Game = { id: 1, name: 'Game A', description: '', price: 10000, image: '', category: '', players: '' };
    const game2: Game = { id: 2, name: 'Game B', description: '', price: 20000, image: '', category: '', players: '' };

    cartService.addToCart(game1);
    cartService.addToCart(game2);
    fixture.detectChanges();

    const subtotal = component.subtotal();
    expect(subtotal).toBe(30000);
  });
});
