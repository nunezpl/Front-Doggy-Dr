import { Component, ChangeDetectorRef } from '@angular/core';
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
    private petService: PetService,
    private cdr: ChangeDetectorRef
  ){
    
  }

  //realizo llamados cuando ya está cargada la interfaz
  ngOnInit(): void {
    //this.petList = this.petService.findAll();
    this.petService.findAll().subscribe(
      (pets) => this.petList = pets
    )
  }

  showPet(pet: Pet){
    this.selectedPet = pet;
  }

  editPet(pet: Pet) {
    //this.petList.push(pet);
    console.log('Edit pet', pet);
    this.selectedPet = { ...pet };
  }

  deletePet(pet: Pet) {
    console.log('Delete pet', pet);
    var index = this.petList.indexOf(pet);
    if (index !== -1) {
      this.petList.splice(index, 1);  // Elimina el elemento de la lista
      this.petService.deleteById(pet.id);
    }
  }

  addPet(pet: Pet) {
    // Si es una edición (el ID ya existe), actualiza el registro existente
    const index = this.petList.findIndex(p => p.id === pet.id);
    if (index !== -1) {
      this.petList[index] = pet; // Actualiza la mascota existente
      console.log('Updated pet:', pet);
    } else {
      // Si es una nueva mascota, asigna un nuevo ID
      pet.id = this.petList.length > 0 ? Math.max(...this.petList.map(p => p.id)) + 1 : 1;
      this.petList.push(pet); // Agrega la nueva mascota
      this.petService.addPet(pet);
      console.log('Added new pet:', pet);
    }

    this.cdr.detectChanges(); // Forzar detección de cambios

    // Reinicia la mascota seleccionada después de agregar o editar
    this.resetSelectedPet();
  }
  
  resetSelectedPet() {
    this.selectedPet = {
      id: 0,
      nombre: '',
      raza: '',
      edad: 0,
      enfermedad: '',
      peso: 0,
      urlImage: ''
    };
  }
}
