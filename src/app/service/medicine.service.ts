import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../medicine/medicine';
import { Observable, switchMap } from 'rxjs';
import { Treatment } from '../treatment/treatment';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) {}

  getMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>('http://localhost:8090/medicine/all');
  }

  addMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>('http://localhost:8090/medicine/add', medicine);
  }

  findById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>('http://localhost:8090/medicine/' + id);
  }

  updateMedicine(medicine: Medicine): Observable<Medicine> {
    
    if (!medicine || !medicine.id) { // Verificar que pet y su ID estén definidos
      console.error("No se puede actualizar la mascota porque no se ha proporcionado un ID válido.");
      throw new Error("El objeto `pet` o su ID no está definido.");
    }
    console.log(" Update medicine: ", medicine);

    return this.http.put<Medicine>('http://localhost:8090/medicine/update/' + medicine.id, medicine);
  }

  findTreatmentsById(id: number): Observable<Treatment[]> {
    return this.http.get<Treatment[]>('http://localhost:8090/medicine/' + id/ + '/treatments');
  }

}
