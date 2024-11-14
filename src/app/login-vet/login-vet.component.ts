import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login-vet',
  templateUrl: './login-vet.component.html',
  styleUrls: ['./login-vet.component.css']
})
export class LoginVetComponent {
  vetId: string = '';                     // ID del veterinario
  vetName: String = '';
  successMessage: string | null = null;   // Mensaje de éxito
  errorMessage: string | null = null;     // Mensaje de error

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const username = loginForm.value.user;
      const password = loginForm.value.password;
  
      console.log("Login: " + username + " - " + password);
  
      this.loginService.Vetlogin(username, password).subscribe({
        next: (response: any) => {
          console.log('Inicio de sesión exitoso', response);
          
          // Obtener vetId y name de la respuesta
          this.vetId = response.id || ''; // Ajusta según tu estructura de respuesta
          this.vetName = response.name || ''; // Añadir el nombre del veterinario
          console.log('Inicio de sesión vetId:', this.vetId);
          console.log('Inicio de sesión vetName', this.vetName);
  
          // Redirigir a la página de perfil del veterinario
          const urlProfile = `/vet/${this.vetId}`;
          this.router.navigate([urlProfile]);
  
          // Establecer el mensaje de éxito
          this.successMessage = 'Inicio de sesión exitoso!';
          this.errorMessage = null; // Limpiar el mensaje de error
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
          this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
          this.successMessage = null; // Limpiar el mensaje de éxito
        }
      });
    }
  }
  
}
