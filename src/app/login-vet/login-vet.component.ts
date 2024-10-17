import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar

@Component({
  selector: 'app-login-vet',
  templateUrl: './login-vet.component.html',
  styleUrls: ['./login-vet.component.css']
})
export class LoginVetComponent {
  // Define vetId que se obtiene de alguna parte (puedes reemplazarlo como sea necesario)
  vetId: string = '';

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private snackBar: MatSnackBar
  ) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const username = loginForm.value.user;  // Obtener el usuario del formulario
      const password = loginForm.value.password;  // Obtener la contraseña del formulario
  
      console.log("Login: " + username + " - " + password);
  
      this.loginService.Vetlogin(username, password).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          
          // Obtener vetId de la respuesta si existe (ajusta según tu backend)
          this.vetId = response.id || ''; // O ajusta según tu estructura de respuesta
          
          // Redirigir a la página de perfil del veterinario después de un inicio de sesión exitoso
          const urlProfile = `/vet/${this.vetId}`;
          this.router.navigate([urlProfile]);  // Redirigir a la URL construida
          
          // Mostrar un snack-bar de éxito
          this.openSnackBar('Inicio de sesión exitoso!', 'Cerrar');
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
          // Mostrar un snack-bar de error si las credenciales son incorrectas
          this.openSnackBar('Credenciales incorrectas. Intenta nuevamente.', 'Cerrar');
        }
      });
    }
  }

  // Método para abrir el snackbar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duración en milisegundos
    });
  }
}
