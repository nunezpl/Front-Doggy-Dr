import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from 'src/app/service/pet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pet-update',
  templateUrl: './pet-update.component.html',
  styleUrls: ['./pet-update.component.css']
})
export class PetUpdateComponent {

  @Input() petSelected!: Pet;

  @Output() addPetEvent = new EventEmitter<Pet>();
  
  sendPet!: Pet;

  formPet: Pet = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    enfermedad: '',
    peso: 0,
    urlImage: '',
    owner: { id: 1, name:"", document: 0, mail:"", username: "", phone: 0 }
  };

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      
      // Llamar al servicio para obtener la mascota por su id
      this.petService.findById(id).subscribe(
        (pet: Pet) => {
          // Asignar la mascota obtenida a formPet para mostrarla en el formulario
          this.formPet = { ...pet };
          this.sendPet = pet;
        },
        error => {
          console.error('Error al obtener la mascota: ', error);
        }
      );
    });
  }
/*
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
*/
  // Método para actualizar la mascota
  updatePet(): void {
    console.log('Mascota a actualizar:', this.sendPet); // Agregar esto para verificar el valor de sendPet
    if (!this.sendPet) {
      console.error("La mascota a actualizar no está definida.");
      return;
    }
  
    // Imprimir el objeto antes de hacer la solicitud
  console.log('Objeto `Pet` antes de actualizar:', this.formPet);

    this.petService.updatePet(this.formPet).subscribe(
      (response) => {
        console.log('Mascota actualizada: ', response);
      },
      (error) => {
        console.error('Error al actualizar la mascota: ', error);
      }
    );
  }
}
