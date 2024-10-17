import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vet } from '../vet';
import { VetService } from 'src/app/service/vet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, mergeMap } from 'rxjs';
import { transition } from '@angular/animations';

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
    password: '',
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
      
      // Llamar al servicio para obtener el propietario por su id
      this.vetService.findById(id).pipe(
        mergeMap(
          (vetInfo) => {
            this.formVet = vetInfo;
            this.sendVet = vetInfo;
            return this.vetService.findVetTreatments(id);
          }
        )
      ).subscribe(
        (treatments) => {
          console.log(" treatments:", treatments.length);
          this.sendVet.treatments = treatments;
        }
      )
    });
  }

  // Método para actualizar el veterinario
  updateVet(): void {
    console.log('Veteriario a actualizar:', this.sendVet); // Agregar esto para verificar el valor de sendVet
    if (!this.sendVet) {
      console.error("El veterinario a actualizar no está definido.");
      return;
    }
  
  // Imprimir el objeto antes de hacer la solicitud
  console.log('Objeto `Vet` antes de actualizar:', this.formVet);

    this.vetService.updateVet(this.formVet).subscribe(
      (response) => {
        console.log('Veterinario actualizado: ', response);
        // Navegar a otra página o mostrar mensaje de éxito si es necesario
        this.router.navigate(['/vet/all']);
      },
      (error) => {
        console.error('Error al actualizar el veterinario: ', error);
      }
    );
  }


}
