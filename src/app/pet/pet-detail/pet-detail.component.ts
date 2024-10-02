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
    /*console.log("ngOnInit de detail");

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.pet = this.petService.findById(id);
    })*/
    console.log("ngOnInit de detail");
    //Llamar un API
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.petService.findById(id).subscribe(
        datosPerro => this.pet = datosPerro  
      );
    })
  }

  ngOnChange(): void {
    console.log("ngOnChange de detail");
  }

}
