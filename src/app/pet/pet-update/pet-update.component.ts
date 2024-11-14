import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from 'src/app/service/pet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { Owner } from 'src/app/owner/owner';
import { OwnerService } from 'src/app/service/owner.service';
import { Treatment } from 'src/app/treatment/treatment';
import { TreatmentService } from 'src/app/service/treatment.service';
import { Medicine } from 'src/app/medicine/medicine';
import { MedicineService } from 'src/app/service/medicine.service';
import { VetService } from 'src/app/service/vet.service';
import { Vet } from 'src/app/vet/vet';

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
    owner: { id: 1, name: "", document: 0, mail: "", username: "", phone: 0 },
    treatments: [],
    status: true
  };

  formTreatment: Treatment = {
    id: 0,
    name: '',
    description: '',
    medicines: [],
    vet: { id: 0, name: '', specialty: '', urlImage: '', userName: '', password: '', document: 0, phone: 0, mail: '', status: true, treatments: [] },
    pet: {
      id: 0,
      nombre: '',
      raza: '',
      edad: 0,
      enfermedad: '',
      peso: 0,
      urlImage: '',
      owner: { id: 0, name: '', username: '', document: 0, mail: '' },
      treatments: [],
      status: false
    },
    startDate: new Date(),
    endDate: new Date()
  };

  owners: Owner[] = [];  // Lista para almacenar los dueños
  treatments: Treatment[] = [];
  medicinesList: Medicine[] = [];
  vetsList: Vet[] = [];


  constructor(
    private petService: PetService,
    private ownerService: OwnerService,
    private treatmentService: TreatmentService,
    private medicineService: MedicineService,
    private vetService: VetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOwners();  // Cargar los dueños al iniciar
    this.loadMedicines();
    this.loadVets();

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
      );
    });
  }

  loadOwners(): void {
    this.ownerService.findAll().subscribe(owners => {
      this.owners = owners;
    });
  }

  loadMedicines(): void {
    this.medicineService.getMedicines().subscribe(medicines => {
      this.medicinesList = medicines;
    });
  }

  loadVets(): void {
    this.vetService.findAll().subscribe(vets => {
      this.vetsList = vets;
    });
  }

  onMedicineChange(medicine: Medicine): void {
    const index = this.formTreatment.medicines.findIndex(med => med.id === medicine.id);
    if (index > -1) {
      this.formTreatment.medicines.splice(index, 1); // Quitar el medicamento si ya está
    } else {
      this.formTreatment.medicines.push(medicine); // Añadir el medicamento si no está
    }
  }

  isMedicineSelected(medicine: Medicine): boolean {
    return this.formTreatment.medicines.some(m => m.id === medicine.id);
  }

  // Método para actualizar la mascota
  updatePet(): void {
    console.log('Mascota a actualizar:', this.sendPet); // Verificar el valor de sendPet
    if (!this.sendPet) {
      console.error("La mascota a actualizar no está definida.");
      return;
    }

    // Asignar la mascota actual al `pet` del tratamiento
    this.formTreatment.pet = this.formPet;

    // Asignar el veterinario si no se ha asignado ya
    if (this.formTreatment.vet ) {
      this.formTreatment.vet = {
        ...this.formTreatment.vet,
        // Aquí deberías asignar el `id` del veterinario en sesión
        id: this.formTreatment.vet.id // Reemplazar con el `id` correcto si es necesario
      };
    }

    // Imprimir el objeto antes de hacer la solicitud
    console.log('Objeto `Pet` antes de actualizar:', this.formPet);

    // Agregar un log para verificar los tratamientos seleccionados
    console.log('Tratamiento a agregar:', this.formTreatment);

    // Llamar al servicio de actualización de la mascota
    this.petService.updatePet(this.formPet).subscribe(
      (response) => {
        console.log('Mascota actualizada con tratamientos:', response);

        // Crear el tratamiento asociado a la mascota
        this.treatmentService.addTreatment(this.formTreatment).subscribe(
          (treatmentResponse) => {
            console.log('Tratamiento asociado a la mascota:', treatmentResponse);
            this.router.navigate(['/pet/all']);
          },
          (error) => {
            console.error('Error al asociar el tratamiento a la mascota:', error);
          }
        );
      },
      (error) => {
        console.error('Error al actualizar la mascota:', error);
      }
    );
  }

}
