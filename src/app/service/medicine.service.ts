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

  /*updateMedicine(medicine: Medicine): Observable<Medicine> {
    /*const index = this.petList.findIndex(o => o.id === pet.id);
    this.petList[index] = pet;
    if (!pet || !pet.id) { // Verificar que pet y su ID estén definidos
      console.error("No se puede actualizar la mascota porque no se ha proporcionado un ID válido.");
      throw new Error("El objeto `pet` o su ID no está definido.");
    }
    console.log(" UpdatePet: ", pet);

    return this.http.put<Pet>('http://localhost:8090/pet/update/' + pet.id, pet).pipe(
      switchMap((updatedPet) => {
        // Una vez que la mascota ha sido actualizada, asóciala con el dueño
        return this.http.put<Pet>(`http://localhost:8090/pet/${updatedPet.id}/associate/${pet.owner.id}`, {});
      })
    );
  }*/
}
