import { Component } from '@angular/core';
import { Treatment } from '../treatment';
import { Pet } from 'src/app/pet/pet';
import { Medicine } from 'src/app/medicine/medicine';
import { TreatmentService } from 'src/app/service/treatment.service';
import { PetService } from 'src/app/service/pet.service';
import { MedicineService } from 'src/app/service/medicine.service';

@Component({
  selector: 'app-treatment-form',
  templateUrl: './treatment-form.component.html',
  styleUrls: ['./treatment-form.component.css']
})
export class TreatmentFormComponent {
  
  formTreatment: Treatment = {
    id: 0,
    name: '',
    description: '',
    medicines: [],
    vet: { id: 0, name: '', specialty: '', urlImage: '', userName: '', password: '', document: 0, phone: 0, mail: '',  status: true, treatments: [] },
    pets: [],
    startDate: new Date(),
    endDate: new Date()
  };

  petsList: Pet[] = [];
  medicinesList: Medicine[] = [];

  constructor(
    private treatmentService: TreatmentService,
    private petService: PetService,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    // Cargar las mascotas disponibles
    this.petService.findAll().subscribe(pets => {
      this.petsList = pets;
    });

    // Cargar los medicamentos disponibles
    this.medicineService.getMedicines().subscribe(medicines => {
      this.medicinesList = medicines;
    });
  }

  onSubmit() {
    // Lógica para guardar el tratamiento
    this.treatmentService.addTreatment(this.formTreatment).subscribe(response => {
      console.log('Tratamiento agregado:', response);
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
}
