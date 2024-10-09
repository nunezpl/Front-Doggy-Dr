import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Owner } from '../owner';
import { OwnerService } from 'src/app/service/owner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent {

  constructor(
    private ownerService: OwnerService,
    private router: Router
  ) {
    
  }

  @Input() 
  selectedOwner!: Owner | null;

  @Output() addOwnerEvent = new EventEmitter<Owner>();

  sendOwner!: Owner;

  formOwner: Owner = {
    id: 0,
    name: '' ,
    username: '' ,
    document: 0 ,
    phone: 0 ,
    mail: '' ,
    pets: [] ,
  };

  ngOnChanges() {
    if (this.selectedOwner) {
      this.formOwner = { ...this.selectedOwner }; // Llena el formulario con los datos de la mascota
    } else {
      this.resetForm(); // Resetea el formulario si no hay mascota seleccionada
    }
  }
  resetForm() {
    this.formOwner = {
      id: 0,
      name: '' ,
      username: '' ,
      document: 0 ,
      phone: 0 ,
      mail: '' ,
      pets: [] ,
    };
  }
  addOwnerForm() {
    console.log(this.formOwner);
    this.sendOwner = Object.assign({}, this.formOwner);
    this.ownerService.addOwner(this.sendOwner);
    this.resetForm(); 
    window.scrollTo(0, 0);
  }
  
  onSubmit() {
    console.log('Formulario enviado con los siguientes datos:', this.formOwner);
    this.ownerService.addOwner(this.formOwner).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      this.router.navigate(['/owner/all']);
    });
    this.resetForm();  // Opcional: Restablece el formulario
  }
  
}
