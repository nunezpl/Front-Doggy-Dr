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
import { VetTableComponent } from './vet/vet-table/vet-table.component';
import { PetFormComponent } from './pet/pet-form/pet-form.component';

const routes: Routes = [
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
    { path: 'owner/:id/pets', component: PetTableComponent},

    // Vet routes/
    { path: 'vet/all', component: VetTableComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
