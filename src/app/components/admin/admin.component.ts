import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GAMES_MOCK } from '../../data/games.mock';
import { USERS_MOCK } from '../../data/users.mock';
import { Game } from '../../models/game.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  products: Game[] = [...GAMES_MOCK];
  users: User[] = USERS_MOCK;
  notice = '';
  editingId: number | null = null;

  formData: Omit<Game, 'id'> = {
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    players: ''
  };

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(value);
  }

  saveProduct(): void {
    if (this.editingId !== null) {
      this.products = this.products.map((product) =>
        product.id === this.editingId ? { id: this.editingId, ...this.formData } : product
      );
      this.notice = 'Producto actualizado.';
    } else {
      this.products = [
        ...this.products,
        {
          id: Date.now(),
          ...this.formData
        }
      ];
      this.notice = 'Producto agregado.';
    }

    this.resetForm();
  }

  editProduct(product: Game): void {
    this.editingId = product.id;
    this.formData = {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      players: product.players
    };
    this.notice = 'Editando producto seleccionado.';
  }

  deleteProduct(productId: number): void {
    this.products = this.products.filter((product) => product.id !== productId);
    if (this.editingId === productId) {
      this.resetForm();
    }
    this.notice = 'Producto eliminado.';
  }

  resetForm(): void {
    this.editingId = null;
    this.formData = {
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      players: ''
    };
  }
}
