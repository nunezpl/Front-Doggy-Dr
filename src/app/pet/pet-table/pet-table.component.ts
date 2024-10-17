import { Component, ChangeDetectorRef } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from 'src/app/service/pet.service';
import { VetService } from 'src/app/service/vet.service';
import { ActivatedRoute } from '@angular/router';

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
    urlImage: '',
    owner: { id: 1, name:"", document: 0, mail:"", username: "", phone: 0 },
    treatments: []
  };
    //Bd falsa
  petList!: Pet[];
  searchQuery: string = ''; 

  //Inyectar dependencias
  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private vetService: VetService,
    private cdr: ChangeDetectorRef
  ){
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const vetId = Number(params.get('id'));
      if(vetId){
        this.vetService.findVetPets(vetId).subscribe(
          (pets) => {
            this.petList = pets;
          },
          (error) => {
            console.error('Error fetching pets for vet:', error);
          }
        );
      }else{
        this.petService.findAll().subscribe(
          (pets) => this.petList = pets
        )
      }
    });
  }

    // Método para filtrar veterinarios según el término de búsqueda
    filteredPets() {
      if (!this.searchQuery) {
        return this.petList;
      }
      return this.petList.filter(pet =>
        pet.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
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
      urlImage: '',
      owner: { id: 1, name:"", document: 0, mail:"", username: "", phone: 0 },
      treatments: []
    };
  }
}
