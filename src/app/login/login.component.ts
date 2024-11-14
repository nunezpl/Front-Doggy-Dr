import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  successMessage: string | null = null;  
  errorMessage: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const user: User = {
        username: loginForm.value.document,
        password: loginForm.value.document,
        document: loginForm.value.document,
      };

      this.loginService.login(user).subscribe({
        next: (token: string) => {
          localStorage.setItem('token', token); // Guardar el token
          
          console.log('Inicio de sesión exitoso, token guardado:', token);
          
          const urlProfile = `/owner/${user.document}/pets`;
          this.router.navigate([urlProfile]);

          this.successMessage = 'Inicio de sesión exitoso!';
          this.errorMessage = null;  
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
          this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
          this.successMessage = null; 
        }
      });
    }
  }
}