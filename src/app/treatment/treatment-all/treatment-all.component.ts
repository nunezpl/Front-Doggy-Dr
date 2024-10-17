import { Component } from '@angular/core';
import { Treatment } from '../treatment';
import { TreatmentService } from 'src/app/service/treatment.service';
import { forkJoin, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-treatment-all',
  templateUrl: './treatment-all.component.html',
  styleUrls: ['./treatment-all.component.css']
})
export class TreatmentAllComponent {
  treatments: Treatment[] = []; // Array para almacenar los tratamientos

  constructor(
    private treatmentService: TreatmentService
  ) {}

  ngOnInit(): void {
    this.loadTreatments(); // Llama al método para cargar los tratamientos
  }

  loadTreatments() {

    this.treatmentService.getTreatments().pipe(
      mergeMap((treatments) => {
        this.treatments = treatments;
        console.log('Treatments List:', this.treatments);
    
        // Aquí devuelve un observable que emite un array de observables
        return forkJoin(
          treatments.map(treatment => 
            forkJoin({
              pets: this.treatmentService.findTreatmentPets(treatment.id).pipe(
                map(pets => {
                  treatment.pets = pets; // Asigna las mascotas al tratamiento
                  return pets;
                })
              ),
              medicines: this.treatmentService.findTreatmentMedicines(treatment.id).pipe(
                map(medicines => {
                  treatment.medicines = medicines; // Asigna los medicamentos al tratamiento
                  return medicines;
                })
              )
            })
          )
        );
      })
    ).subscribe(
      (results) => {
        // Aquí tienes los resultados de cada llamada al servicio para cada owner
        console.log('Results for each owner:', results);
        // Puedes almacenar estos resultados en un array o procesarlos como necesites
      },
      (error) => {
        console.error('Error fetching owners or their data:', error);
      }
    );
  }
}
