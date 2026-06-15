import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  formData = {
    name: 'Cliente Demo',
    email: 'cliente@nexus.cl',
    phone: '+56933334444',
    city: 'Valparaiso'
  };

  saved = false;

  saveProfile(): void {
    this.saved = true;
  }
}
