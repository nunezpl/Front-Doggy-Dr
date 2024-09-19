import { Component, EventEmitter, Output } from '@angular/core';
import { Pet } from '../pet';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent {

  @Output()
  addPetEvent = new EventEmitter<Pet>();

  sendPet!: Pet;

  pet: Pet = {
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

  addPet() {
    console.log(this.pet);
    this.pet = Object.assign({}, this.pet);

    this.addPetEvent.emit(this.pet);
  }
  
}
