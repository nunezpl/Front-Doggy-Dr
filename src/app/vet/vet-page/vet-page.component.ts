import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vet } from '../vet';
import { VetService } from 'src/app/service/vet.service';

@Component({
  selector: 'app-vet-page',
  templateUrl: './vet-page.component.html',
  styleUrls: ['./vet-page.component.css']
})
export class VetPageComponent {
  
  vet!: Vet;

  constructor(
    private vetService: VetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const vetId = Number(params.get('id'));
      this.loadVet(vetId); // Llama a un método para cargar el veterinario
    });
  }

  loadVet(vetId: number): void {
    this.vetService.findById(vetId).subscribe(
      (vet: Vet) => {
        this.vet = vet; // Asigna el veterinario obtenido al componente
      },
      (error) => {
        console.error('Error fetching vet data:', error); // Manejo de errores
      }
    );
  }
}
