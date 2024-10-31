import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { InicioComponent } from './menu/inicio/inicio.component';
import { BlogsComponent } from './menu/blogs/blogs.component';
import { SedesComponent } from './menu/sedes/sedes.component';
import { ServicesComponent } from './menu/services/services.component';
import { ContactComponent } from './menu/contact/contact.component';
import { PetDetailComponent } from './pet/pet-detail/pet-detail.component';
import { PetUpdateComponent } from './pet/pet-update/pet-update.component';
import { PetTableComponent } from './pet/pet-table/pet-table.component';
import { OwnerTableComponent } from './owner/owner-table/owner-table.component';
import { OwnerUpdateComponent } from './owner/owner-update/owner-update.component';
import { OwnerFormComponent } from './owner/owner-form/owner-form.component';
import { VetTableComponent } from './vet/vet-table/vet-table.component';
import { VetUpdateComponent } from './vet/vet-update/vet-update.component';
import { VetFormComponent } from './vet/vet-form/vet-form.component';
import { PetFormComponent } from './pet/pet-form/pet-form.component';
import { LoginComponent } from './login/login.component';
import { OwnerDetailComponent } from './owner/owner-detail/owner-detail.component';
import { VetDetailComponent } from './vet/vet-detail/vet-detail.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { VetPageComponent } from './vet/vet-page/vet-page.component';
import { TreatmentAllComponent } from './treatment/treatment-all/treatment-all.component';
import { TreatmentFormComponent } from './treatment/treatment-form/treatment-form.component';
import { LoginVetComponent } from './login-vet/login-vet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TreatmentUpdateComponent } from './treatment/treatment-update/treatment-update.component';
import { MedicineUpdateComponent } from './medicine/medicine-update/medicine-update.component';
import { MedicineAllComponent } from './medicine/medicine-all/medicine-all.component';

const routes: Routes = [

  { path: '', component: InicioComponent},
  { path: 'admin', component: AdminPageComponent },
    { path: 'inicio', component: InicioComponent},
    { path: 'services', component: ServicesComponent},
    { path: 'blogs', component: BlogsComponent},
    { path: 'sedes', component: SedesComponent},
    { path: 'contact', component: ContactComponent},

    // Pet routes
    { path: 'pet/find/:id', component: PetDetailComponent },
    { path: 'pet/update/:id', component: PetUpdateComponent},
    { path: 'pet/adds', component: PetFormComponent},
    { path: 'pet/all', component: PetTableComponent},

    // Client routes
    { path: 'owner/all', component: OwnerTableComponent},
    { path: 'owner/:id/pets', component: OwnerDetailComponent},
    { path: 'owner/update/:id', component: OwnerUpdateComponent},
    { path: 'owner/adds', component: OwnerFormComponent},

    // Vet routes/
    { path: 'vet/find/:id', component: VetDetailComponent },
    { path: 'vet/all', component: VetTableComponent},
    { path: 'vet/update/:id', component: VetUpdateComponent},
    { path: 'vet/adds', component: VetFormComponent},
    { path: 'vet/:id', component: VetPageComponent},
    { path: 'vet/:id/treatments', component: TreatmentAllComponent},
    { path: 'vet/:id/pets', component: PetTableComponent},

    // Treatment routes
    { path: 'treatment/all', component: TreatmentAllComponent},
    { path: 'treatment/adds', component: TreatmentFormComponent},
    { path: 'treatment/update/:id', component: TreatmentUpdateComponent},

    // LogIn
    { path: 'login', component: LoginComponent },
    { path: 'loginAdmin', component: LoginAdminComponent },
    { path: 'loginVet', component: LoginVetComponent },
    { path: 'admin/dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    // Medicine
    { path: 'medicine/all', component: MedicineAllComponent},
    { path: 'medicine/update/:id', component: MedicineUpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
