import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pet } from '../pet';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent {

  @Output()
  addPetEvent = new EventEmitter<Pet>();
  @Input() 
  selectedPet!: Pet | null;

  sendPet!: Pet;

  formPet: Pet = {
    id: 1,
    nombre: "",
    raza: "",
    edad: 0,
    enfermedad: "",
    peso: 0,
    urlImage: ""
    //,
    //owner: { id: 1, name: 'John Doe' }
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
      urlImage: ""
    };
  }
  addPetForm() {
    console.log(this.formPet);
    this.sendPet = Object.assign({}, this.formPet);
    this.addPetEvent.emit(this.formPet);
    this.resetForm(); 
    window.scrollTo(0, 0);
  }
  
}
