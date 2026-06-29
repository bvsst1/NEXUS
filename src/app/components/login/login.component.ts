import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  feedbackMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    this.feedbackMessage = '';

    const isValid = this.authService.login(this.formData.email, this.formData.password);
    if (!isValid) {
      this.feedbackMessage = 'No encontramos una cuenta con ese correo y contrasena.';
      return;
    }

    this.router.navigateByUrl(this.authService.getDashboardRoute());
  }
}
