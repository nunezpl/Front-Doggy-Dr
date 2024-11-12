import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  getResponse(userInput: string): string {
    // Lógica simple de respuesta
    if (userInput.includes('hola')) {
      return '¡Hola! ¿Cómo puedo ayudarte?';
    } else if (userInput.includes('adiós')) {
      return '¡Hasta luego!';
    } else {
      return 'No entendí eso, ¿puedes reformular?';
    }
  }
}