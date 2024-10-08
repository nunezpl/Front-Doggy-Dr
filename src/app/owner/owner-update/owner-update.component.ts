import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Owner } from '../owner';
import { OwnerService } from 'src/app/service/owner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { PetService } from 'src/app/service/pet.service';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css']
})
export class OwnerUpdateComponent {

  @Input() ownerSelected!: Owner;

  @Output() addOwnerEvent = new EventEmitter<Owner>();
  
  sendOwner!: Owner;

  formOwner: Owner = {
    id: 0,
    name: '' ,
    username: '' ,
    document: 0 ,
    phone: 0 ,
    mail: '' ,
    pets: [] 
  };

  constructor(
    private ownerService: OwnerService,
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      
      // Llamar al servicio para obtener el propietario por su id
      this.ownerService.findById(id).pipe(
        mergeMap(
          (petInfo) => {
            this.formOwner = petInfo;
            this.sendOwner = petInfo;
            return this.ownerService.findOwnerPets(id);
          }
        )
      ).subscribe(
        (pets) => {
          console.log(" pets:", pets.length);
          this.sendOwner.pets = pets;
        }
      )
    });
  }

  // Método para actualizar el propietario
  updateOwner(): void {
    console.log('Cliente a actualizar:', this.sendOwner); // Verificar el valor de sendOwner
    if (!this.sendOwner) {
      console.error("El cliente a actualizar no está definido.");
      return;
    }
  
    // Imprimir el objeto antes de hacer la solicitud
    console.log('Objeto `Owner` antes de actualizar:', this.formOwner);

    this.ownerService.updateOwner(this.formOwner).subscribe(
      (response) => {
        console.log('Cliente actualizado: ', response);
        // Navegar a otra página o mostrar mensaje de éxito si es necesario
        this.router.navigate(['/owner/all']);
      },
      (error) => {
        console.error('Error al actualizar el cliente: ', error);
      }
    );
  }
}
