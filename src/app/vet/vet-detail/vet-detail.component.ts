import { Component } from '@angular/core';
import { Vet } from '../vet';
import { VetService } from 'src/app/service/vet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vet-detail',
  templateUrl: './vet-detail.component.html',
  styleUrls: ['./vet-detail.component.css']
})
export class VetDetailComponent {
  vet: Vet | undefined;

  constructor(
    private vetService: VetService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    console.log("ngOnInit de detail");
    //Llamar un API
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.vetService.findById(id).subscribe(
        datosVet => this.vet = datosVet  
      );
    })
  }

  ngOnChange(): void {
    console.log("ngOnChange de detail");
  }

}
