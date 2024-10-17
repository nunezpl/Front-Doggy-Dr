import { Component, Input } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from 'src/app/service/pet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent {

  pet: Pet = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    enfermedad: '',
    peso: 0,
    urlImage: '',
    owner: { id: 1, name:"", document: 0, mail:"", username: "", phone: 0 },
    treatments: []
  };

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    console.log("ngOnInit de detail");
  
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
  
      // Primero carga los datos de la mascota
      this.petService.findById(id).pipe(
        mergeMap(pet => {
          this.pet = pet; // Asignamos los datos de la mascota
          console.log("Pet loaded:", this.pet);
  
          // Carga el dueño de la mascota
          return this.petService.findOwnerPet(pet.id);
        }),
        mergeMap(owner => {
          if (this.pet) {
            this.pet.owner = owner;
          }
          console.log("Owner loaded:", this.pet?.owner);
  
          // Luego, carga los tratamientos asociados
          return this.petService.findPetTreatments(this.pet.id);
        })
      ).subscribe(
        treatments => {
          if (this.pet) {
            this.pet.treatments = treatments;
          }
          console.log("Treatments loaded:", this.pet?.treatments);
        },
        error => {
          console.error("Error loading pet, owner, or treatments:", error);
        }
      );
    });
  }
  
  

  ngOnChange(): void {
    console.log("ngOnChange de detail");
  }

}
