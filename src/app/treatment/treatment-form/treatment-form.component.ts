import { Component } from '@angular/core';
import { Treatment } from '../treatment';
import { Pet } from 'src/app/pet/pet';
import { Medicine } from 'src/app/medicine/medicine';
import { TreatmentService } from 'src/app/service/treatment.service';
import { PetService } from 'src/app/service/pet.service';

@Component({
  selector: 'app-treatment-form',
  templateUrl: './treatment-form.component.html',
  styleUrls: ['./treatment-form.component.css']
})
export class TreatmentFormComponent {
  formTreatment!: Treatment;
  petsList: Pet[] = [];
  medicinesList: Medicine[] = [];

  constructor(
    private treatmentService: TreatmentService,
    private petService: PetService//private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    // Cargar las mascotas disponibles
    this.petService.findAll().subscribe(pets => {
      this.petsList = pets;
    });

    // Cargar los medicamentos disponibles
    /*this.medicineService.getMedicines().subscribe(medicines => {
      this.medicinesList = medicines;
    });*/
  }

  onSubmit() {
    // Lógica para guardar el tratamiento
    this.treatmentService.addTreatment(this.formTreatment).subscribe(response => {
      console.log('Tratamiento agregado:', response);
    });
  }
}
