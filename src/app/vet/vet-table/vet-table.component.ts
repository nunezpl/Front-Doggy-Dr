import { Component, ChangeDetectorRef } from '@angular/core';
import { Vet } from '../vet';
import { VetService } from 'src/app/service/vet.service';

@Component({
  selector: 'app-vet-table',
  templateUrl: './vet-table.component.html',
  styleUrls: ['./vet-table.component.css']
})
export class VetTableComponent {
  selectedVet: Vet = {
    id: 0,
    name: '',
    specialty: '',
    urlImage: '',
    userName: '',
    document: 0,
    phone: 0,
    mail: '',
    treatments: []
  };
    //Bd falsa
  vetsList!: Vet[];

  //Inyectar dependencias
  constructor(
    private vetService: VetService,
    private cdr: ChangeDetectorRef
  ){
    
  }

  //realizo llamados cuando ya está cargada la interfaz
  ngOnInit(): void {
    //this.petList = this.petService.findAll();
    this.vetService.findAll().subscribe(
      (vets) => {this.vetsList = vets;
      console.log('Vets List:', this.vetsList);}
    )
  }

  showVet(vet: Vet){
    this.selectedVet = vet;
  }

  editVet(vet: Vet) {
    //this.petList.push(pet);
    console.log('Edit Vet', vet);
    this.selectedVet = { ...vet };
  }

  deleteVet(vet: Vet) {
    console.log('Delete vet', vet);
    var index = this.vetsList.indexOf(vet);
    if (index !== -1) {
      this.vetsList.splice(index, 1);  // Elimina el elemento de la lista
      this.vetService.deleteById(vet.id);
    }
  }

  addVet(vet: Vet) {
    // Si es una edición (el ID ya existe), actualiza el registro existente
    const index = this.vetsList.findIndex(p => p.id === vet.id);
    if (index !== -1) {
      this.vetsList[index] = vet; // Actualiza el veterinario existente
      console.log('Updated vet:', vet);
    } else {
      // Si es un nuevo veterinario, asigna un nuevo ID
      vet.id = this.vetsList.length > 0 ? Math.max(...this.vetsList.map(p => p.id)) + 1 : 1;
      this.vetsList.push(vet); // Agrega el nuevo veterinario
      this.vetService.addVet(vet);
      console.log('Added new vet:', vet);
    }

    this.cdr.detectChanges(); // Forzar detección de cambios

    // Reinicia la mascota seleccionada después de agregar o editar
    this.resetSelectedVet();
  }
  
  resetSelectedVet() {
    this.selectedVet = {
      id: 0,
      name: '',
      specialty: '',
      urlImage: '',
      userName: '',
      document: 0,
      phone: 0,
      mail: '',
      treatments: []
    };
  }
}
