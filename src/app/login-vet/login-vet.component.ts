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
  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const username = loginForm.value.user;  // Obtener el usuario del formulario
      const password = loginForm.value.password;  // Obtener la contraseña del formulario
  
      console.log("Login: " + username + " - " + password);
  
      this.loginService.Vetlogin(username, password).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          // Redirigir a la página de perfil del propietario (owner) después de un inicio de sesión exitoso
          const urlProfile = `/vet`;
          this.router.navigate([urlProfile]);  // Redirigir a la URL construida
          
          // Mostrar un toast de éxito
          this.openSnackBar('Inicio de sesión exitoso!', 'Cerrar');
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
          // Mostrar un toast de error si las credenciales son incorrectas
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
