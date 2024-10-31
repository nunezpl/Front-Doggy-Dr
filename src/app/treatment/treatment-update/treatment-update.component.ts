import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Treatment } from '../treatment';
import { Medicine } from 'src/app/medicine/medicine';
import { TreatmentService } from 'src/app/service/treatment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vet } from 'src/app/vet/vet';
import { Pet } from 'src/app/pet/pet';
import { VetService } from 'src/app/service/vet.service';
import { MedicineService } from 'src/app/service/medicine.service';

@Component({
  selector: 'app-treatment-update',
  templateUrl: './treatment-update.component.html',
  styleUrls: ['./treatment-update.component.css']
})
export class TreatmentUpdateComponent {
  @Input() treatmentSelected!: Treatment;
  @Output() updateTreatmentEvent = new EventEmitter<Treatment>();

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
      owner: { id: 0, name: '', document: 0, mail: '', username: '', phone: 0 }, // Propiedad owner inicializada
      treatments: [], 
      status: true 
    }, 
    startDate: new Date(),
    endDate: new Date()
  };
  
  

  vets: Vet[] = [];
  pets: Pet[] = [];
  medicines: Medicine[] = [];

  constructor(
    private treatmentService: TreatmentService,
    private medicineService: MedicineService,
    private vetService: VetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID de la ruta
    console.log("ID del tratamiento: " + id);

    if (id) {
      this.treatmentService.findById(id).subscribe(
        (treatment: Treatment) => {
          this.formTreatment = treatment; // Asigna el tratamiento recuperado
          this.loadVets();
          this.loadPet(); // Cargar la mascota específica en lugar de múltiples
          this.loadMedicines();
        },
        (error) => {
          console.error('Error fetching treatment:', error);
        }
      );
    }
  }

  loadVets(): void {
    this.vetService.findAll().subscribe(vets => {
      this.vets = vets; // Asignar todos los veterinarios a la variable

      // Preseleccionar el veterinario asociado al tratamiento
      this.treatmentService.findTreatmentVet(this.formTreatment.id).subscribe(vet => {
        this.formTreatment.vet = vet;
      });
    });
  }

  loadPet(): void {
    // Cambiado a `findTreatmentPet` para obtener una sola mascota
    this.treatmentService.findTreatmentPet(this.formTreatment.id).subscribe(pet => {
      this.formTreatment.pet = pet; // Asigna la mascota única al tratamiento
    });
  }

  loadMedicines(): void {
    // Primero, cargar todos los medicamentos
    this.medicineService.getMedicines().subscribe(medicines => {
      this.medicines = medicines; // Asignar todos los medicamentos a la variable
  
      // Luego, cargar los medicamentos específicos del tratamiento
      this.treatmentService.findTreatmentMedicines(this.formTreatment.id).subscribe(treatmentMedicines => {
        // Asignar los medicamentos del tratamiento a formTreatment
        this.formTreatment.medicines = treatmentMedicines; 
      });
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

  updateTreatment(): void {
    console.log('Tratamiento a actualizar:', this.formTreatment);
    this.treatmentService.addTreatment(this.formTreatment).subscribe(
      (response) => {
        console.log('Tratamiento actualizado:', response);
        this.router.navigate(['/treatment/all']);
      },
      (error) => {
        console.error('Error al actualizar el tratamiento:', error);
      }
    );
  }

  isMedicineSelected(medicine: Medicine): boolean {
    return this.formTreatment.medicines.some(m => m.id === medicine.id);
  }
}
