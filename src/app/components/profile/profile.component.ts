import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  readonly cartItems = this.cartService.totalItems;

  formData = {
    name: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  };

  saved = false;

  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService,
    private readonly router: Router
  ) {
    const activeUser = this.authService.currentUser();

    if (activeUser) {
      this.formData = {
        name: activeUser.name,
        email: activeUser.email,
        phone: activeUser.phone,
        city: activeUser.city,
        address: activeUser.address
      };
    }
  }

  saveProfile(): void {
    this.authService.updateProfile(this.formData);
    this.saved = true;
  }

  completePurchase(): void {
    this.saveProfile();
    this.cartService.clearCart();
    this.router.navigateByUrl('/checkout-success');
  }
}
