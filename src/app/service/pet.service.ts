import { Injectable } from '@angular/core';
import { Pet } from '../pet/pet';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Pet[]>{
    return this.http.get<Pet[]>('http://localhost:8090/pet/all');
  }

  findById(id:number):Observable<Pet>{
    /*const pet:Pet = this.petList.find(o => o.id === id)!;
    return pet;*/
    return this.http.get<Pet>('http://localhost:8090/pet/find/'+id);
  }

  deleteById(id:Number){
    console.log(id);
    return this.http.delete('http://localhost:8090/pet/delete/'+id).subscribe();
  }
  updatePet(pet:Pet): Observable<Pet>{
    /*const index = this.petList.findIndex(o => o.id === pet.id);
    this.petList[index] = pet;*/
    if (!pet || !pet.id) { // Verificar que pet y su ID estén definidos
      console.error("No se puede actualizar la mascota porque no se ha proporcionado un ID válido.");
      throw new Error("El objeto `pet` o su ID no está definido.");
    }
    console.log(" UpdatePet: ", pet);
    
    return this.http.put<Pet>('http://localhost:8090/pet/update/'+ pet.id, pet);
  }

  /*addPet(pet:Pet): Observable<Pet>{
    //this.petList.push(pet);
    return this.http.post<Pet>('http://localhost:8090/pet/add', pet);
  }*/

  
    addPet(pet: Pet): Observable<Pet> {
      console.log('Mascota a agregar:', pet); 
      return this.http.post<Pet>('http://localhost:8090/pet/add', pet);
    }


}
