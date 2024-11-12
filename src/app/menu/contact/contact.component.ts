import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    nombre: '',
    correo: '',
    celular: '',
    mensaje: '',
    date: ''
  };

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    // Establece la fecha actual al iniciar el componente
    const today = new Date();
    this.formData.date = today.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
  }

  onSubmit() {
    if (this.formData.nombre && this.formData.correo && this.formData.celular && this.formData.mensaje && this.formData.date) {
      this.emailService.sendEmail(
        this.formData.correo, 
        'Confirmación de Cita Veterinaria', 
        'Estimado(a) ' + this.formData.nombre + ',\n\n' +
        'Hemos recibido su mensaje y nos complace informarle que ha sido seleccionado(a) para una nueva cita el día ' + this.formData.date + '.\n\n' +
        'En caso de requerir más información, nos pondremos en contacto con usted a través de este medio o bien a través de su número telefónico ' + this.formData.celular + '.\n\n' +
        'Agradecemos su confianza y quedamos a su disposición.' +
        'Adjunto encontrará el mensaje que nos envió: \n\n' + this.formData.mensaje
      ).subscribe(response => {
          console.log('Correo enviado con éxito:', response);
          alert('Correo enviado con éxito');
        },
        error => {
          console.error('Error al enviar el correo:', error);
        }
      );
    } else {
      alert('Por favor complete todos los campos.');
    }
  }
}
