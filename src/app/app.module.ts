import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './basic/header/header.component';
import { FooterComponent } from './basic/footer/footer.component';
import { BlogsComponent } from './menu/blogs/blogs.component';
import { ServicesComponent } from './menu/services/services.component';
import { InicioComponent } from './menu/inicio/inicio.component';
import { SedesComponent } from './menu/sedes/sedes.component';
import { ContactComponent } from './menu/contact/contact.component';
import { PetTableComponent } from './pet/pet-table/pet-table.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { PetDetailComponent } from './pet/pet-detail/pet-detail.component';
import { PetFormComponent } from './pet/pet-form/pet-form.component';
import { FormsModule } from '@angular/forms';
import { PetUpdateComponent } from './pet/pet-update/pet-update.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OwnerDetailComponent } from './owner/owner-detail/owner-detail.component';
import { OwnerTableComponent } from './owner/owner-table/owner-table.component';
import { VetTableComponent } from './vet/vet-table/vet-table.component';
import { OwnerFormComponent } from './owner/owner-form/owner-form.component';
import { OwnerUpdateComponent } from './owner/owner-update/owner-update.component';
import { VetUpdateComponent } from './vet/vet-update/vet-update.component';
import { VetDetailComponent } from './vet/vet-detail/vet-detail.component';
import { VetFormComponent } from './vet/vet-form/vet-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { VetPageComponent } from './vet/vet-page/vet-page.component';
import { TreatmentAllComponent } from './treatment/treatment-all/treatment-all.component';
import { TreatmentFormComponent } from './treatment/treatment-form/treatment-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginVetComponent } from './login-vet/login-vet.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TreatmentUpdateComponent } from './treatment/treatment-update/treatment-update.component';
import { MedicineUpdateComponent } from './medicine/medicine-update/medicine-update.component';
import { MedicineAllComponent } from './medicine/medicine-all/medicine-all.component';
import { AuthInterceptor } from './helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BlogsComponent,
    ServicesComponent,
    InicioComponent,
    SedesComponent,
    ContactComponent,
    PetTableComponent,
    AdminPageComponent,
    PetDetailComponent,
    PetFormComponent,
    PetUpdateComponent,
    OwnerDetailComponent,
    OwnerTableComponent,
    PetUpdateComponent,
    PetUpdateComponent,
    OwnerDetailComponent,
    OwnerTableComponent,
    VetTableComponent,
    OwnerFormComponent,
    OwnerUpdateComponent,
    VetUpdateComponent,
    VetDetailComponent,
    VetFormComponent,
    LoginComponent,
    DashboardComponent,
    LoginAdminComponent,
    VetPageComponent,
    TreatmentAllComponent,
    TreatmentFormComponent,
    LoginVetComponent,
    TreatmentUpdateComponent,
    MedicineUpdateComponent,
    MedicineAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
