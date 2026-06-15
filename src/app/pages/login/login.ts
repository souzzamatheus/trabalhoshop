import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = 'mor_2314';
  password = '83r5^_';
  loading = false;
  errorMessage = '';

  submit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        void this.router.navigate(['/perfil']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Login invalido. Confira usuario e senha.';
      },
    });
  }
}
