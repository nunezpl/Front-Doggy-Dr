import { Component } from '@angular/core';
import { Medicine } from '../medicine';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from 'src/app/service/medicine.service';

@Component({
  selector: 'app-medicine-update',
  templateUrl: './medicine-update.component.html',
  styleUrls: ['./medicine-update.component.css']
})
export class MedicineUpdateComponent {

  medicine: Medicine | undefined;

  constructor(
    private medicineService: MedicineService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const medicineId = Number(this.route.snapshot.paramMap.get('id')); // Obtenemos el ID de la URL
    this.medicineService.findById(medicineId).subscribe(
      (data: Medicine) => {
        this.medicine = data; // Cargamos la medicina seleccionada
      },
      error => {
        console.error('Error al cargar la medicina:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.medicine) {
      this.medicineService.updateMedicine(this.medicine).subscribe(
        () => {
          console.log('Medicina actualizada con éxito');
          this.router.navigate(['/medicines']); // Redirigimos a la lista de medicinas
        },
        error => {
          console.error('Error al actualizar la medicina:', error);
        }
      );
    }
  }
  
}
