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
  successMessage: string | null = null;   // Mensaje de éxito
  errorMessage: string | null = null;     // Mensaje de error

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const username = loginForm.value.user;    // Obtener el usuario del formulario
      const password = loginForm.value.password; // Obtener la contraseña del formulario
  
      console.log("Login: " + username + " - " + password);
  
      this.loginService.Vetlogin(username, password).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          
          // Obtener vetId de la respuesta si existe
          this.vetId = response.id || ''; // Ajusta según tu estructura de respuesta
          
          // Redirigir a la página de perfil del veterinario después de un inicio de sesión exitoso
          const urlProfile = `/vet/${this.vetId}`;
          this.router.navigate([urlProfile]);  // Redirigir a la URL construida
          
          // Establecer el mensaje de éxito
          this.successMessage = 'Inicio de sesión exitoso!';
          this.errorMessage = null; // Limpiar el mensaje de error
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
          // Establecer el mensaje de error
          this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
          this.successMessage = null; // Limpiar el mensaje de éxito
        }
      });
    }
  }
}
