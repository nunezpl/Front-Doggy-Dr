import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Treatment } from '../treatment/treatment';
import { Pet } from '../pet/pet';
import { Medicine } from '../medicine/medicine';
import { Vet } from '../vet/vet';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(
    private http: HttpClient
  ) {}

  getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>('http://localhost:8090/treatment/all');
  }

  findById(id:number):Observable<Treatment>{
    return this.http.get<Treatment>('http://localhost:8090/treatment/'+id);
  }

  findTreatmentPets(id:number):Observable<Pet[]>{
    return this.http.get<Pet[]>('http://localhost:8090/treatment/'+id+ '/pets');
  }

  findTreatmentVet(id:number):Observable<Vet>{
    return this.http.get<Vet>('http://localhost:8090/treatment/'+id+ '/vet');
  }

  findTreatmentMedicines(id:number):Observable<Medicine[]>{
    return this.http.get<Medicine[]>('http://localhost:8090/treatment/'+id+ '/medicines');
  }

  addTreatment(treatment: Treatment): Observable<Treatment> {
    console.log('Tratamiento a agregar:', treatment); 
    return this.http.post<Treatment>('http://localhost:8090/treatment/add', treatment).pipe(
      switchMap((createdTreatment) => {

        console.log('Tratamiento creado:', createdTreatment);

        console.log('Tratamiento id:', createdTreatment.id); 
        console.log('Veterinario id asociado:', treatment.vet.id); 
        // Una vez que el tratamiento ha sido creado, asocia el tratamiento con el veterinario
        return this.http.put<Treatment>(`http://localhost:8090/treatment/${createdTreatment.id}/associate/${treatment.vet.id}`, {});
      })
    );
  }
  

  deleteById(id:Number){
    console.log(id);
    return this.http.delete('http://localhost:8090/treatment/delete/'+id).subscribe();
  }

}
