import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vet } from '../vet';
import { VetService } from 'src/app/service/vet.service';
import { Router } from '@angular/router';
import { Treatment } from 'src/app/treatment/treatment';
import { TreatmentService } from 'src/app/service/treatment.service';

@Component({
  selector: 'app-vet-form',
  templateUrl: './vet-form.component.html',
  styleUrls: ['./vet-form.component.css']
})
export class VetFormComponent {

  constructor(
    private vetService: VetService, 
    private treatmentService: TreatmentService,
    private router: Router
  ) {
    
  }

  @Input() 
  selectedVet!: Vet | null;

  @Output() addPetEvent = new EventEmitter<Vet>();

  sendVet!: Vet;
  treatmentsList: Treatment[] = []; // Lista de tratamientos disponibles

  formVet: Vet = {
    id: 300,
    name: '',
    specialty: '',
    urlImage: '',
    userName: '',
    password: '', 
    document: 0,
    phone: 0,
    mail: '',
    status: false,
    treatments: []
  };

  ngOnInit(): void {
    this.loadTreatments(); // Cargar tratamientos al inicializar el componente
  }

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
      status: false,
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
    this.formVet.id = 300; // id de prueba
    console.log('Formulario enviado con los siguientes datos:', this.formVet);
    this.vetService.addVet(this.formVet).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      this.router.navigate(['/vet/all']);
    });
    this.resetForm();  // Opcional: Restablece el formulario
  }
  
  loadTreatments(): void {
    this.treatmentService.getTreatments().subscribe(treatments => {
      this.treatmentsList = treatments;
    });
  }

  // Método para manejar el cambio de selección de tratamientos
  onTreatmentSelect(event: Event): void {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    this.formVet.treatments = Array.from(selectedOptions).map(option => {
      const treatmentId = Number(option.value);
      return this.treatmentsList.find(treatment => treatment.id === treatmentId) as Treatment;
    });
  }

  isTreatmentSelected(treatment: Treatment): boolean {
    return this.formVet.treatments.some(t => t.id === treatment.id);
  }

}
