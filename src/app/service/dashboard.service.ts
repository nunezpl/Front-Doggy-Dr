import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class DashboardService {
    constructor(private http: HttpClient) {}
  
    getTreatmentsLastMonth(): Observable<number> {
      return this.http.get<number>('http://localhost:8090/treatment/total');
    }
  
    getTreatmentsByMedicine(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:8090/treatment/Medicines');
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
      return this.http.get<number>('http://localhost:8090/pet/active');
    }
  
    getTotalSales(): Observable<number> {
      return this.http.get<number>('http://localhost:8090/treatment/totalSales');
    }
  
    getTotalEarnings(): Observable<number> {
      return this.http.get<number>('http://localhost:8090/treatment/totalGains');
    }
  
    getTop3Treatments(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:8090/treatment/top3');
    }
  }
  