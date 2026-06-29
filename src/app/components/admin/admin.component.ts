import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Game } from '../../models/game.model';
import { AuthService } from '../../services/auth.service';
import { CatalogService, ProductPayload } from '../../services/catalog.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  readonly products = this.catalogService.games;
  readonly users = this.authService.users;
  notice = '';
  editingId: number | null = null;

  formData: ProductPayload = {
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    players: ''
  };

  constructor(
    private readonly catalogService: CatalogService,
    private readonly authService: AuthService
  ) {}

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(value);
  }

  saveProduct(): void {
    this.catalogService.saveProduct(this.formData, this.editingId);
    this.notice = this.editingId !== null ? 'Producto actualizado.' : 'Producto agregado.';
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
    this.catalogService.deleteProduct(productId);

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
