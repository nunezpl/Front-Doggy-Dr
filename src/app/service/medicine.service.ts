import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../medicine/medicine';
import { Observable } from 'rxjs';

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

}
