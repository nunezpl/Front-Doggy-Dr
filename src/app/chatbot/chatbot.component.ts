import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  @Output() close = new EventEmitter<void>();

  messages: { text: string, sender: string }[] = [];
  userInput: string = '';
  botStep: number = 0;
  role: string = '';
  clientOptionSelected: boolean = false;
  adminOptionSelected: boolean = false;
  showConfirmation: boolean = false;
  confirmationText: string = '';
  redirectUrl: string = '';
  vetID: number = 0;

  botResponses = {
    greeting: 'Hola soy VetBot, tu asistente personal en Doggy Dr. Para entender cómo ayudarte, elige tu rol: Cliente, Veterinario o Administrador',
    invalidRole: 'No te entendí. Por favor selecciona "Cliente", "Veterinario" o "Administrador".',
    clientOptions: '¿Qué te gustaría hacer? Elige una opción:',
    adminOptions: '¿Qué te gustaría hacer? Elige una opcion:',
    services: 'Nuestros servicios incluyen: consultas veterinarias, chequeos generales, vacunación, cirugías, y más. Para más detalles, puedes visitar nuestra página de servicios.',
    sede: 'Nos encontramos en la Universidad Javeriana, Edificio de Ingeniería, Piso 10, Consultorio 352. Para ver todas las sedes, visita nuestra página.',
    blogs: 'Puedes leer nuestros blogs más recientes sobre salud animal y cuidados en nuestra página de blogs.',
    contact: 'Puedes contactarnos con nosotros a través de teléfono o correo electrónico. Para más detalles, visita nuestra página de contacto.',
    loginClient: 'Puedes revisar el estado de tus mascotas en nuestra página de inicio de sesión.',
    adminVets: 'Puedes administrar los veterinarios en nuestra página de veterinarios.',
    dashboard: 'Puedes revisar las estadísticas de la veterinaria en nuestra página de dashboard.',
    adminPets: 'Puedes administrar las mascotas en nuestra página de mascotas.',
    adminOwners: 'Puedes administrar los propietarios en nuestra página de propietarios.',
    adminTreatments: 'Puedes administrar los tratamientos en nuestra página de tratamientos.',
    date: 'Para agendar una cita, por favor selecciona una fecha y escriba sus datos.',
    redirecting: 'Redirigiendo...',
  };

  constructor(private router: Router) {
    this.messages.push({ text: this.botResponses.greeting, sender: 'bot' });
  }

  selectRole(role: string) {
    this.messages.push({ text: `Elegiste: ${role}`, sender: 'user' });
    this.role = role.toLowerCase();
    this.processRoleSelection(this.role);
  }

  private processRoleSelection(role: string) {
    // Limpiar el chat al seleccionar un rol
    this.messages = [];

    if (role === 'cliente') {
      this.messages.push({ text: '¡Hola Cliente! ¿Cómo te puedo ayudar hoy?', sender: 'bot' });
      this.botStep = 1;
      this.showClientOptions();
    } else if (role === 'veterinario'  && this.isVetRoute()) {
      this.messages.push({ text: '¡Hola Veterinario '+ this .vetID +'! ¿Qué necesitas hacer hoy?', sender: 'bot' });
      this.botStep = 1;
    }else if (role === 'veterinario') {
      this.messages.push({ text: 'No tienes permisos para acceder como Veterinario.', sender: 'bot' });
      this.botStep = 1;
    }
    
    else if (role === 'administrador' && this.isAdminRoute()) {
      this.messages.push({ text: '¡Hola Administrador! ¿Cómo puedo asistirte hoy?', sender: 'bot' });
      this.botStep = 1;
      this.showAdminOptions();
    } else if (role === 'administrador') {
      this.messages.push({ text: 'No tienes permisos para acceder como Administrador.', sender: 'bot' });
    } 
    else {
      this.messages.push({ text: this.botResponses.invalidRole, sender: 'bot' });
    }
  }

  private showClientOptions() {
    if (!this.clientOptionSelected) {
      this.messages.push({ text: this.botResponses.clientOptions, sender: 'bot' });
    }
  }

  private showAdminOptions() {
    if (!this.clientOptionSelected) {
      this.messages.push({ text: this.botResponses.adminOptions, sender: 'bot' });
    }
  }

  handleClientOption(option: string) {
    this.clientOptionSelected = true;
    this.messages = [];

    let responseText = '';
    let redirectUrl = '';

    switch (option) {
      case '1':
        responseText = this.botResponses.services;
        redirectUrl = '/services';
        break;
      case '2':
        responseText = this.botResponses.sede;
        redirectUrl = '/sedes';
        break;
      case '3':
        responseText = this.botResponses.blogs;
        redirectUrl = '/blogs';
        break;
      case '4':
        responseText = this.botResponses.contact;
        redirectUrl = '/contact';
        break;
      case '5':
        responseText = this.botResponses.loginClient;
        redirectUrl = '/login';
        break;
        case '6':
          responseText = this.botResponses.date;
          redirectUrl = '/date';
          break;
      case '7':
        this.changeRole();
        return;   
      default:
        responseText = 'Opción no válida. Por favor elige una opción válida.';
        break;
    }

    this.messages.push({ text: responseText, sender: 'bot' });

    this.botStep = 2;

    this.showConfirmation = true;
    this.confirmationText = '¿Deseas ir a la página seleccionada?';
    this.redirectUrl = redirectUrl;
  }

  handleAdminOption(option: string) {
    this.adminOptionSelected = true;
    this.messages = [];

    let responseText = '';
    let redirectUrl = '';

    switch (option) {
      case '1':
        responseText = this.botResponses.adminVets;
        redirectUrl = '/vet/all';
        break;
      case '2':
        responseText = this.botResponses.dashboard;
        redirectUrl = '/admin/dashboard';
        break;
      case '3':
        responseText = this.botResponses.adminPets;
        redirectUrl = '/pet/all';
        break;
      case '4':
        responseText = this.botResponses.adminOwners;
        redirectUrl = '/owner/all';
        break;
      case '5':
        responseText = this.botResponses.adminTreatments;
        redirectUrl = '/treatment/all';
        break;
      case '6':
        this.changeRole();
        return;   
      default:
        responseText = 'Opción no válida. Por favor elige una opción válida.';
        break;
    }

    this.messages.push({ text: responseText, sender: 'bot' });

    this.botStep = 2;

    this.showConfirmation = true;
    this.confirmationText = '¿Deseas ir a la página seleccionada?';
    this.redirectUrl = redirectUrl;
  }

  handleVetOption(option: string) {
    this.adminOptionSelected = true;
    this.messages = [];

    let responseText = '';
    let redirectUrl = '';

    switch (option) {
      case '1':
        responseText = this.botResponses.adminPets;
        redirectUrl = '/pet/all';
        break;
      case '2':
        responseText = this.botResponses.adminOwners;
        redirectUrl = '/owner/all';
        break;
      case '3':
        responseText = this.botResponses.adminTreatments;
        redirectUrl = `/vet/${this.vetID.toString()}/treatments`;
        break;
      case '4':
        this.changeRole();
        return;   
      default:
        responseText = 'Opción no válida. Por favor elige una opción válida.';
        break;
    }

    this.messages.push({ text: responseText, sender: 'bot' });

    this.botStep = 2;

    this.showConfirmation = true;
    this.confirmationText = '¿Deseas ir a la página seleccionada?';
    this.redirectUrl = redirectUrl;
  }

  handleButtonClick(action: { action: string, redirectUrl?: string }) {
    if (action.action === 'continue' && action.redirectUrl) {
      this.router.navigate([action.redirectUrl]);
    } else if (action.action === 'back') {
      this.showConfirmation = false;
      this.botStep = 1;
      this.returnToClientOptions();
    }
  }

  private isAdminRoute(): boolean {
    const adminRoutes = ['/admin', '/admin/dashboard'];
    return adminRoutes.includes(this.router.url);
  }

  private isVetRoute(): boolean {
    const vetRoutePattern = /^\/vet\/(\d+)$/; // Verifica que la ruta tenga el formato /vet/ seguido de un número (ID)
    const match = this.router.url.match(vetRoutePattern); // Busca coincidencias en la URL actual
    
    if (match) {
      this.vetID = parseInt(match[1], 10); // Guarda el ID como número en la variable global `vetID`
      return true; // Ruta válida para veterinario
    }
  
    this.vetID = 0; // Reinicia `vetID` si no coincide con el patrón
    return false;
  }

  returnToClientOptions() {
    this.clientOptionSelected = false;
    this.messages = [];
    this.showClientOptions();
  }

  changeRole() {
    this.role = '';
    this.botStep = 0;
    this.messages.push({ text: 'Por favor elige un rol nuevamente.', sender: 'bot' });
    this.showClientOptions();
  }

  closeChatbot() {
    this.close.emit();
  }
}
