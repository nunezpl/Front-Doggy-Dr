import { Component } from '@angular/core';
import { Medicine } from '../medicine';
import { MedicineService } from 'src/app/service/medicine.service';

@Component({
  selector: 'app-medicine-all',
  templateUrl: './medicine-all.component.html',
  styleUrls: ['./medicine-all.component.css']
})
export class MedicineAllComponent {
  medicines: Medicine[] = [];
  searchQuery: string = '';

  constructor(private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.medicineService.getMedicines().subscribe(
      (data: Medicine[]) => {
        this.medicines = data;
      },
      (error) => {
        console.error('Error al cargar los medicamentos:', error);
      }
    );
  }

  /*deleteMedicine(medicine: Medicine): void {
    if (confirm('¿Estás seguro de que deseas eliminar este medicamento?')) {
      this.medicineService.delete(medicine.id).subscribe(
        () => {
          this.loadMedicines(); // Recargamos la lista después de borrar
        },
        (error) => {
          console.error('Error al borrar el medicamento:', error);
        }
      );
    }
  }*/
}
