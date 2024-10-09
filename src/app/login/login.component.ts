import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const document = loginForm.value.document;  // Obtener el documento del formulario
  
      console.log("Login: " + document);
  
      this.loginService.login(document).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          // Redirigir a la página de perfil del propietario (owner) después de un inicio de sesión exitoso
          const urlProfile = `/owner/${document}/pets`;
          this.router.navigate([urlProfile]);  // Redirigir a la URL construida
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
        }
      });
    }
  }
  
}