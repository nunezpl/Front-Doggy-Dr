import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class DashboardService {
    constructor(private http: HttpClient) {}
  
    getTreatmentsLastMonth(): Observable<number> {
      return this.http.get<number>('http://localhost:8090/admin/treatments/last-month');
    }
  
    getTreatmentsByMedicine(): Observable<any[]> {
      return this.http.get<any[]>('/api/admin/treatments/medicines');
    }
  
    getActiveVeterinarians(): Observable<number> {
      return this.http.get<number>('http://localhost:8090/vet/active');
    }
  
    getInactiveVeterinarians(): Observable<number> {
      return this.http.get<number>('http://localhost:8090/vet/inactive');
    }
  
    getTotalPets(): Observable<number> {
        return this.http.get<number>('http://localhost:8090/pet/total');
    }      
  
    getActivePets(): Observable<number> {
      return this.http.get<number>('/api/admin/pets/active');
    }
  
    getTotalSales(): Observable<number> {
      return this.http.get<number>('/api/admin/sales/total');
    }
  
    getTotalEarnings(): Observable<number> {
      return this.http.get<number>('/api/admin/earnings/total');
    }
  
    getTop3Treatments(): Observable<any[]> {
      return this.http.get<any[]>('/api/admin/treatments/top-3');
    }
  }
  