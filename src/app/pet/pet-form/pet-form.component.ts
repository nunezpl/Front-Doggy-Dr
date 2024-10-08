import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from 'src/app/service/pet.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent {

  constructor(
    private petService: PetService
  ) {
    
  }

  @Input() 
  selectedPet!: Pet | null;

  @Output() addPetEvent = new EventEmitter<Pet>();

  sendPet!: Pet;

  formPet: Pet = {
    id: 0,
    nombre: "",
    raza: "",
    edad: 0,
    enfermedad: "",
    peso: 0,
    urlImage: "",
    owner: { id: 1, name:"", document: 0, mail:"", username: "", phone: 0 }
  };

  /*clients: Client[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];*/

  ngOnChanges() {
    if (this.selectedPet) {
      this.formPet = { ...this.selectedPet }; // Llena el formulario con los datos de la mascota
    } else {
      this.resetForm(); // Resetea el formulario si no hay mascota seleccionada
    }
  }
  resetForm() {
    this.formPet = {
      id: 0,
      nombre: "",
      raza: "",
      edad: 0,
      enfermedad: "",
      peso: 0,
      urlImage: "",
      owner: { id: 1, name:"", document: 0, mail:"", username: "", phone: 0 }
    };
  }
  addPetForm() {
    console.log(this.formPet);
    this.sendPet = Object.assign({}, this.formPet);
    this.petService.addPet(this.sendPet);
    this.resetForm(); 
    window.scrollTo(0, 0);
  }
  
  onSubmit() {
    console.log('Formulario enviado con los siguientes datos:', this.formPet);
    this.petService.addPet(this.formPet).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      // Puedes agregar lógica adicional si es necesario
    });
    this.resetForm();  // Opcional: Restablece el formulario
  }
  
}
