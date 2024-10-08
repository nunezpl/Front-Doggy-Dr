import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vet } from '../vet';
import { VetService } from 'src/app/service/vet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vet-update',
  templateUrl: './vet-update.component.html',
  styleUrls: ['./vet-update.component.css']
})
export class VetUpdateComponent {

  @Input() vetSelected!: Vet;

  @Output() addVetEvent = new EventEmitter<Vet>();
  
  sendVet!: Vet;

  formVet: Vet = {
    id: 0,
    name: '',
    specialty: '',
    urlImage: '',
    userName: '',
    document: 0,
    phone: 0,
    mail: '',
    treatments: []
  };

  constructor(
    private vetService: VetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      
      // Llamar al servicio para obtener la mascota por su id
      this.vetService.findById(id).subscribe(
        (vet: Vet) => {
          // Asignar la mascota obtenida a formPet para mostrarla en el formulario
          this.formVet = { ...vet };
          this.sendVet = vet;
        },
        error => {
          console.error('Error al obtener el veterinario: ', error);
        }
      );
    });
  }

  // Método para actualizar la mascota
  updateVet(): void {
    console.log('Veteriario a actualizar:', this.sendVet); // Agregar esto para verificar el valor de sendPet
    if (!this.sendVet) {
      console.error("El veterinario a actualizar no está definido.");
      return;
    }
  
    // Imprimir el objeto antes de hacer la solicitud
  console.log('Objeto `Vet` antes de actualizar:', this.formVet);

    this.vetService.updateVet(this.formVet).subscribe(
      (response) => {
        console.log('Mascota actualizada: ', response);
      },
      (error) => {
        console.error('Error al actualizar la mascota: ', error);
      }
    );
  }
}
