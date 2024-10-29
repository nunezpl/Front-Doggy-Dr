import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/pet/pet';
import { OwnerService } from 'src/app/service/owner.service';
import { Owner } from '../owner';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css']
})
export class OwnerDetailComponent {

  owner: Owner | undefined;

  constructor(
    private route: ActivatedRoute,
    private ownerService: OwnerService // Inyectar el servicio para obtener datos del cliente
  ) {}

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL y convertirlo a número
    
    const clientId = Number(this.route.snapshot.paramMap.get('id'));
    if (clientId) {
      console.log("Owner pets: ", clientId);
      this.loadClientData(clientId);
    }
  }

  loadClientData(clientId: number): void {

    // Cargar datos del dueño
    this.ownerService.findByDocument(clientId).subscribe(ownerInfo => {
      this.owner = ownerInfo;

      this.ownerService.findOwnerPets(ownerInfo.id).subscribe(ownerPets => {
        if (this.owner) {
          this.owner.pets = ownerPets;
        }
      });
    });
  }

}
