import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { InicioComponent } from './menu/inicio/inicio.component';
import { BlogsComponent } from './menu/blogs/blogs.component';
import { SedesComponent } from './menu/sedes/sedes.component';
import { ServicesComponent } from './menu/services/services.component';
import { ContactComponent } from './menu/contact/contact.component';
import { PetDetailComponent } from './pet/pet-detail/pet-detail.component';

const routes: Routes = [
  { path: 'admin', component: AdminPageComponent },
    { path: 'inicio', component: InicioComponent},
    { path: 'services', component: ServicesComponent},
    { path: 'blogs', component: BlogsComponent},
    { path: 'sedes', component: SedesComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'pets/:id', component: PetDetailComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
