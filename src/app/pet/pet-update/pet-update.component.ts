import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from 'src/app/service/pet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { Owner } from 'src/app/owner/owner';
import { OwnerService } from 'src/app/service/owner.service';

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
    owner: { id: 1, name:"", document: 0, mail:"", username: "", phone: 0 },
    treatments: [],
    status: true
  };

  owners: Owner[] = [];  // Lista para almacenar los dueño

  constructor(
    private petService: PetService,
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOwners();  // Cargar los dueños al iniciar

    // Obtener el parámetro 'id' de la URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      
      // Llamar al servicio para obtener la mascota por su id
      this.petService.findById(id).pipe(
        mergeMap(
          (petInfo) => {
            this.formPet = petInfo;
            this.sendPet = petInfo;
            return this.petService.findOwnerPet(id);
          }
        )
      ).subscribe(
        (owner) => {
          console.log("Owner: ", owner);
          const foundOwner = this.owners.find(o => o.id === owner.id);
          this.formPet.owner = foundOwner ? foundOwner : { id: 0, name: '', document: 0, mail: '', username: '', phone: 0 }; // Valor por defecto si no se encuentra
          console.log("Dueño asociado en formPet: ", this.formPet.owner);
        }
      )
    
    });
  }

  loadOwners(): void {
    this.ownerService.findAll().subscribe(owners => {
      this.owners = owners;
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
        this.router.navigate(['/pet/all']);
      },
      (error) => {
        console.error('Error al actualizar la mascota: ', error);
      }
    );
  }
}
