import { Component } from '@angular/core';
import { Pet } from '../pet';

@Component({
  selector: 'app-pet-table',
  templateUrl: './pet-table.component.html',
  styleUrls: ['./pet-table.component.css']
})
export class PetTableComponent {

  selectedPet!: Pet;

  petList: Pet[] = [
    {
      id: 1,
      nombre: "Perry", 
      raza: "French Poodle", 
      edad: 2, 
      enfermedad: "Otitis", 
      peso: 3.4, 
      urlImage: "https://wowmascota.com/wp-content/uploads/2019/05/pets-753464_640.jpg"
    },
    {
      id: 2,
      nombre: "Lucas", 
      raza: "Labrador", 
      edad: 2,
      enfermedad: "Gastroenteritis",
      peso: 6.1,
      urlImage: "https://es.mypet.com/wp-content/uploads/sites/23/2021/03/ThinkstockPhotos-590080440.jpg?w=1024"
    }
  ];

  showPet(pet: Pet){
    this.selectedPet = pet;
  }

  editPet(pet: Pet) {
    // Implement your edit functionality here
    console.log('Edit pet', pet);
    
  }

  deletePet(pet: Pet) {
    console.log('Delete pet', pet);
    const index = this.petList.indexOf(pet);
    if (index !== -1) {
      this.petList.splice(index, 1);  // Elimina el elemento de la lista
    }
  }
  

}
