import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vet } from '../vet';
import { VetService } from 'src/app/service/vet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vet-form',
  templateUrl: './vet-form.component.html',
  styleUrls: ['./vet-form.component.css']
})
export class VetFormComponent {

  constructor(
    private vetService: VetService, 
    private router: Router
  ) {
    
  }

  @Input() 
  selectedVet!: Vet | null;

  @Output() addPetEvent = new EventEmitter<Vet>();

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

  ngOnChanges() {
    if (this.selectedVet) {
      this.formVet = { ...this.selectedVet }; // Llena el formulario con los datos del veterinario
    } else {
      this.resetForm(); // Resetea el formulario si no hay mascota seleccionada
    }
  }
  resetForm() {
    this.formVet = {
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
  }
  addVetForm() {
    console.log(this.formVet);
    this.sendVet = Object.assign({}, this.formVet);
    this.vetService.addVet(this.sendVet);
    this.resetForm(); 
    window.scrollTo(0, 0);
  }
  
  onSubmit() {
    console.log('Formulario enviado con los siguientes datos:', this.formVet);
    this.vetService.addVet(this.formVet).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      this.router.navigate(['/vet/all']);
    });
    this.resetForm();  // Opcional: Restablece el formulario
  }
  
}
