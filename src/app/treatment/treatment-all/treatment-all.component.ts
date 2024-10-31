import { Component } from '@angular/core';
import { Treatment } from '../treatment';
import { TreatmentService } from 'src/app/service/treatment.service';
import { forkJoin, map, mergeMap } from 'rxjs';
import { VetService } from 'src/app/service/vet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-treatment-all',
  templateUrl: './treatment-all.component.html',
  styleUrls: ['./treatment-all.component.css']
})
export class TreatmentAllComponent {
  treatments: Treatment[] = []; 
  searchQuery: string = ''; 
  selectedTreatment!: Treatment;

  constructor(
    private treatmentService: TreatmentService,
    private route: ActivatedRoute,
    private vetService: VetService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const vetId = Number(params.get('id'));
      if (vetId) {
        this.loadVetTreatments(vetId);
      } else {
        this.loadTreatments();
      }
    });
  }

  loadTreatments() {
    this.treatmentService.getTreatments().pipe(
      mergeMap((treatments) => {
        this.treatments = treatments;
        return forkJoin(
          treatments.map(treatment => 
            forkJoin({
              pet: this.treatmentService.findTreatmentPet(treatment.id).pipe(
                map(pet => {
                  treatment.pet = pet; // Asigna la mascota única al tratamiento
                  return pet;
                })
              ),
              medicines: this.treatmentService.findTreatmentMedicines(treatment.id).pipe(
                map(medicines => {
                  treatment.medicines = medicines; 
                  return medicines;
                })
              ),
              vet: this.treatmentService.findTreatmentVet(treatment.id).pipe(
                map(vet => {
                  treatment.vet = vet;
                  return vet;
                })
              )
            })
          )
        );
      })
    ).subscribe(
      (results) => {
        console.log('Results for each treatment:', results);
      },
      (error) => {
        console.error('Error fetching treatments or related data:', error);
      }
    );
  }

  loadVetTreatments(vetId: number) {
    this.vetService.findVetTreatments(vetId).pipe(
      mergeMap((treatments) => {
        this.treatments = treatments;
        return forkJoin(
          treatments.map(treatment => 
            forkJoin({
              pet: this.treatmentService.findTreatmentPet(treatment.id).pipe(
                map(pet => {
                  treatment.pet = pet;
                  return pet;
                })
              ),
              medicines: this.treatmentService.findTreatmentMedicines(treatment.id).pipe(
                map(medicines => {
                  treatment.medicines = medicines; 
                  return medicines;
                })
              ),
              vet: this.treatmentService.findTreatmentVet(treatment.id).pipe(
                map(vet => {
                  treatment.vet = vet;
                  return vet;
                })
              )
            })
          )
        );
      })
    ).subscribe(
      (results) => {
        console.log('Results for each treatment:', results);
      },
      (error) => {
        console.error('Error fetching treatments for vet:', error);
      }
    );
  }

  filteredTreatments() {
    if (!this.searchQuery) {
      return this.treatments;
    }
    return this.treatments.filter(treatment =>
      treatment.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  showVet(treatment: Treatment) {
    this.selectedTreatment = treatment;
  }

  editTreatment(treatment: Treatment) {
    console.log('Edit treatment:', treatment);
    this.selectedTreatment = { ...treatment };
  }

  deleteTreatment(treatment: Treatment) {
    console.log('Delete treatment:', treatment);
    const index = this.treatments.indexOf(treatment);
    if (index !== -1) {
      this.treatments.splice(index, 1);
      this.treatmentService.deleteById(treatment.id);
    }
  }
}
