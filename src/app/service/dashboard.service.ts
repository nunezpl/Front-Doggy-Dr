import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class DashboardService {
    constructor(private http: HttpClient) {}
  
    getTreatmentsLastMonth(): Observable<number> {
      return this.http.get<number>(`${environment.backendURL}/treatment/total`);
    }
  
    getTreatmentsByMedicine(): Observable<any[]> {
      return this.http.get<any[]>(`${environment.backendURL}/treatment/Medicines`);
    }
  
    getActiveVeterinarians(): Observable<number> {
      return this.http.get<number>(`${environment.backendURL}/vet/active`);
    }
  
    getInactiveVeterinarians(): Observable<number> {
      return this.http.get<number>(`${environment.backendURL}/vet/inactive`);
    }
  
    getTotalPets(): Observable<number> {
        return this.http.get<number>(`${environment.backendURL}/pet/total`);
    }      
  
    getActivePets(): Observable<number> {
      return this.http.get<number>(`${environment.backendURL}/pet/active`);
    }
  
    getTotalSales(): Observable<number> {
      return this.http.get<number>(`${environment.backendURL}/treatment/totalSales`);
    }
  
    getTotalEarnings(): Observable<number> {
      return this.http.get<number>(`${environment.backendURL}/treatment/totalGains`);
    }
  
    getTop3Treatments(): Observable<any[]> {
      return this.http.get<any[]>(`${environment.backendURL}/treatment/top3`);
    }
  }
  