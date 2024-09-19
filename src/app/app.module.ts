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
    PetFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
