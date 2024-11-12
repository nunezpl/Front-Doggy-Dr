import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { Treatment } from '../treatment/treatment';
import { Pet } from '../pet/pet';
import { Medicine } from '../medicine/medicine';
import { Vet } from '../vet/vet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(
    private http: HttpClient
  ) { }

  getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${environment.backendURL}/treatment/all`);
  }

  findById(id: number): Observable<Treatment> {
    return this.http.get<Treatment>(`${environment.backendURL}/treatment/` + id);
  }

  findTreatmentPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${environment.backendURL}/treatment/` + id + '/pet');
  }

  findTreatmentVet(id: number): Observable<Vet> {
    return this.http.get<Vet>(`${environment.backendURL}/treatment/` + id + '/vet');
  }

  findTreatmentMedicines(id: number): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${environment.backendURL}/treatment/` + id + '/medicines');
  }

  addTreatment(treatment: Treatment): Observable<Treatment> {
    console.log('Tratamiento a agregar:', treatment);
    console.log('Veterinario asignado:', treatment.vet); // Verificar el contenido de `vet` antes de la solicitud
    return this.http.post<Treatment>(`${environment.backendURL}/treatment/add`, treatment).pipe(
      switchMap((createdTreatment) => {
        console.log('Tratamiento creado:', createdTreatment);

        const observables = [];

        // Asociar el veterinario
        if (treatment.vet && treatment.vet.id) {
          const vetAssociation$ = this.http.put<Treatment>(
            `${environment.backendURL}/treatment/${createdTreatment.id}/associate/vet/${treatment.vet.id}`,
            {}
          );
          observables.push(vetAssociation$);
        }

        // Asociar las mascotas
        if (treatment.pet && treatment.pet.id) {
          const petAssociation$ = this.http.put<Treatment>(
            `${environment.backendURL}/treatment/${createdTreatment.id}/associate/pet/${treatment.pet.id}`,
            {}
          );
          observables.push(petAssociation$);
        }

        // Asociar los medicamentos
        if (treatment.medicines && treatment.medicines.length > 0) {
          treatment.medicines.forEach((medicine) => {
            const medicineAssociation$ = this.http.put<Treatment>(
              `${environment.backendURL}/treatment/${createdTreatment.id}/associate/medicine/${medicine.id}`,
              {}
            );
            observables.push(medicineAssociation$);
          });
        }

        // Ejecutar todas las solicitudes de asociación
        return forkJoin(observables).pipe(
          switchMap(() => {
            // Devuelve el tratamiento final con todas las asociaciones realizadas
            return of(createdTreatment);
          })
        );
      })
    );
  }



  deleteById(id: Number) {
    console.log(id);
    return this.http.delete(`${environment.backendURL}/treatment/delete/` + id).subscribe();
  }

}
