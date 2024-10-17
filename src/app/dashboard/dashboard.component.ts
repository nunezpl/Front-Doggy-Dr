import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  treatmentsLastMonth: number = 0;
  treatmentsByMedicine: any[] = [];
  activeVeterinarians: number = 0;
  inactiveVeterinarians: number = 0;
  totalPets: number = 0;
  activePets: number = 0;
  totalSales: number = 0;
  totalEarnings: number = 0;
  top3Treatments: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadKPIs();
  }

  loadKPIs(): void {
    this.dashboardService.getTreatmentsLastMonth().subscribe(data => {
      this.treatmentsLastMonth = data;
    });

    this.dashboardService.getTreatmentsByMedicine().subscribe(data => {
      console.log(data); // Verifica la estructura de los datos aquí
      this.treatmentsByMedicine = data;
    });

    this.dashboardService.getActiveVeterinarians().subscribe(data => {
      this.activeVeterinarians = data;
    });

    this.dashboardService.getInactiveVeterinarians().subscribe(data => {
      this.inactiveVeterinarians = data;
    });

    this.dashboardService.getTotalPets().subscribe(data => {
      this.totalPets = data;
    });

    this.dashboardService.getActivePets().subscribe(data => {
      this.activePets = data;
    });

    this.dashboardService.getTotalSales().subscribe(data => {
      this.totalSales = data;
    });

    this.dashboardService.getTotalEarnings().subscribe(data => {
      this.totalEarnings = data;
    });

    this.dashboardService.getTop3Treatments().subscribe(data => {
      console.log(data); // Verifica la estructura de los datos aquí
      this.top3Treatments = data;
      console.log(this.top3Treatments);
    });
    
  }
}
