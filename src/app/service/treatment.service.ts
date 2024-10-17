import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Treatment } from '../treatment/treatment';
import { Pet } from '../pet/pet';
import { Medicine } from '../medicine/medicine';

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

  findTreatmentPets(id:number):Observable<Pet[]>{
    return this.http.get<Pet[]>('http://localhost:8090/treatment/'+id+ '/pets');
  }

  findTreatmentMedicines(id:number):Observable<Medicine[]>{
    return this.http.get<Medicine[]>('http://localhost:8090/treatment/'+id+ '/medicines');
  }

  addTreatment(treatment: Treatment): Observable<Treatment> {
    console.log('Treatmnt a agregar:', treatment); 
    return this.http.post<Treatment>('http://localhost:8090/treatment/add', treatment);
  }

}
