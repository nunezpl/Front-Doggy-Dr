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
  updatePet(pet:Pet){
    /*const index = this.petList.findIndex(o => o.id === pet.id);
    this.petList[index] = pet;*/
    return this.http.put('http://localhost:8090/pet/add', pet).subscribe();
  }

  addPet(pet:Pet){
    //this.petList.push(pet);
    return this.http.post('http://localhost:8090/pet/add', pet).subscribe();
  }

}
