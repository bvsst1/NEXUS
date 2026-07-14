import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Game } from '../../models/game.model';
import { AuthService } from '../../services/auth.service';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  games: Game[] = [];
  readonly users = this.authService.users;
  notice = '';
  editingId: number | null = null;
  readonly gameForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly gamesService: GamesService,
    private readonly authService: AuthService
  ) {
    this.gameForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      image: [''],
      category: [''],
      players: ['']
    });
  }

  ngOnInit(): void {
    this.loadGames();
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(value);
  }

  saveProduct(): void {
    const formValue = this.gameForm.value;

    if (this.editingId !== null) {
      this.gamesService.updateGame(this.editingId, formValue).subscribe({
        next: () => {
          this.notice = 'Producto actualizado.';
          this.resetForm();
          this.loadGames();
        },
        error: () => (this.notice = 'Error al actualizar producto.')
      });
    } else {
      this.gamesService.addGame(formValue).subscribe({
        next: () => {
          this.notice = 'Producto agregado.';
          this.resetForm();
          this.loadGames();
        },
        error: () => (this.notice = 'Error al agregar producto.')
      });
    }
  }

  editProduct(product: Game): void {
    this.editingId = product.id;
    this.gameForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      players: product.players
    });
    this.notice = 'Editando producto seleccionado.';
  }

  deleteProduct(productId: number): void {
    this.gamesService.deleteGame(productId).subscribe({
      next: () => {
        if (this.editingId === productId) {
          this.resetForm();
        }
        this.notice = 'Producto eliminado.';
        this.loadGames();
      },
      error: () => (this.notice = 'Error al eliminar producto.')
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.gameForm.reset({ name: '', description: '', price: 0, image: '', category: '', players: '' });
  }

  private loadGames(): void {
    this.gamesService.getGames().subscribe({
      next: (games) => (this.games = games),
      error: () => (this.notice = 'Error al cargar juegos.')
    });
  }
}
