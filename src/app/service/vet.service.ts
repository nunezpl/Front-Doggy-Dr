import { Injectable } from '@angular/core';
import { Vet } from '../vet/vet';
import { Treatment } from '../treatment/treatment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../pet/pet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VetService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Vet[]>{
    return this.http.get<Vet[]>(`${environment.backendURL}/vet/all`);
  }

  findById(id:number):Observable<Vet>{
    /*const pet:Pet = this.petList.find(o => o.id === id)!;
    return pet;*/
    return this.http.get<Vet>(`${environment.backendURL}/vet/find/`+id);
  }

  deleteById(id:Number){
    console.log(id);
    return this.http.delete(`${environment.backendURL}/vet/delete/`+id).subscribe();
  }
  updateVet(vet:Vet): Observable<Vet>{
    /*const index = this.petList.findIndex(o => o.id === pet.id);
    this.petList[index] = pet;*/
    if (!vet || !vet.id) { // Verificar que pet y su ID estén definidos
      console.error("No se puede actualizar el veterinario porque no se ha proporcionado un ID válido.");
      throw new Error("El objeto `vet` o su ID no está definido.");
    }
    console.log(" UpdateVet: ", vet);
    
    return this.http.put<Vet>(`${environment.backendURL}/vet/update/`+ vet.id, vet);
  }

  addVet(pet: Vet): Observable<Vet> {
    console.log('Veterinario a agregar:', pet); 
    return this.http.post<Vet>(`${environment.backendURL}/vet/add`, pet);
  }

  findVetTreatments(id:number):Observable<Treatment[]>{
    return this.http.get<Treatment[]>(`${environment.backendURL}/vet/`+id+ '/treatments');
  }

  findVetPets(id:number):Observable<Pet[]>{
    return this.http.get<Pet[]>(`${environment.backendURL}/vet/`+id+ '/pets');
  }

  vetHome():Observable<Vet>{
    return this.http.get<Vet>(`${environment.backendURL}/vet/details`);
  }
}
