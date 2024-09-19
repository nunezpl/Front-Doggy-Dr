import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from 'src/app/service/pet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pet-update',
  templateUrl: './pet-update.component.html',
  styleUrls: ['./pet-update.component.css']
})
export class PetUpdateComponent {

  @Input() petSelected!: Pet;

  @Output() addPetEvent = new EventEmitter<Pet>();
  
  sendPet!: Pet;

  formPet!: Pet;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("ngOnInit de update");

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.petSelected = this.petService.findById(id);
      
      if (this.petSelected) {
        // Inicializa formPet solo después de obtener petSelected
        this.formPet = { 
          id: this.petSelected.id,
          nombre: this.petSelected.nombre,
          raza: this.petSelected.raza,
          edad: this.petSelected.edad,
          enfermedad: this.petSelected.enfermedad,
          peso: this.petSelected.peso,
          urlImage: this.petSelected.urlImage
        };
      }
    });
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
  selectedPet!: Pet;
  ngOnChanges() {
    if (this.selectedPet) {
      this.formPet = { ...this.selectedPet }; // Llena el formulario con los datos de la mascota
    } else {
      this.resetForm(); // Resetea el formulario si no hay mascota seleccionada
    }
  }

  addPetForm() {
    console.log(this.formPet);
    this.sendPet = Object.assign({}, this.formPet);
    this.petService.updatePet(this.sendPet);
    this.resetForm(); 
    window.scrollTo(0, 0);
  }
  
  addPet(form: any) {
    console.log(this.formPet);
    this.sendPet = Object.assign({}, this.formPet);
    this.addPetEvent.emit(this.sendPet);
  }
}
