import { Component } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from 'src/app/service/pet.service';

@Component({
  selector: 'app-pet-table',
  templateUrl: './pet-table.component.html',
  styleUrls: ['./pet-table.component.css']
})
export class PetTableComponent {
  selectedPet: Pet = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    enfermedad: '',
    peso: 0,
    urlImage: ''
  };
    //Bd falsa
  petList!: Pet[];

  //Inyectar dependencias
  constructor(
    private petService: PetService
  ){
    
  }

  //realizo llamados cuando ya está cargada la interfaz
  ngOnInit(): void {
    this.petList = this.petService.findAll();
  }

  showPet(pet: Pet){
    this.selectedPet = pet;
  }

  editPet(pet: Pet) {
    //this.petList.push(pet);
    console.log('Edit pet', pet);
    this.selectedPet = pet;
  }

  deletePet(pet: Pet) {
    console.log('Delete pet', pet);
    var index = this.petList.indexOf(pet);
    if (index !== -1) {
      this.petList.splice(index, 1);  // Elimina el elemento de la lista
    }
  }

  addPet(pet: Pet) {
    if (pet.id) { // Verifica si hay un ID, lo que significa que es una edición
      const index = this.petList.findIndex(p => p.id === pet.id);
      if (index !== -1) {
        this.petList[index] = pet; // Actualiza la mascota existente
      }
    } else {
      pet.id = this.petList.length + 1; // Asigna un nuevo ID para nuevas mascotas
      this.petList.push(pet);
    }
  }  
}
