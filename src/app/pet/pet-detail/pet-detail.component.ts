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

  pet: Pet | undefined;

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
  
          // Luego, una vez cargada la mascota, buscamos su dueño
          return this.petService.findOwnerPet(pet.id);
        })
      ).subscribe(
        owner => {
          // Asignamos el dueño a la mascota
          if (this.pet) {
            this.pet.owner = owner;
          }
          console.log("Owner loaded:", this.pet?.owner);
        },
        error => {
          console.error("Error loading pet or owner:", error);
        }
      );
    });
  }
  

  ngOnChange(): void {
    console.log("ngOnChange de detail");
  }

}
