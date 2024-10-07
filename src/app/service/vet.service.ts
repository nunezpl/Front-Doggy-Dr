import { Injectable } from '@angular/core';
import { Vet } from '../vet/vet';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VetService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Vet[]>{
    return this.http.get<Vet[]>('http://localhost:8090/vet/all');
  }

  findById(id:number):Observable<Vet>{
    /*const pet:Pet = this.petList.find(o => o.id === id)!;
    return pet;*/
    return this.http.get<Vet>('http://localhost:8090/vet/find/'+id);
  }

  deleteById(id:Number){
    console.log(id);
    return this.http.delete('http://localhost:8090/vet/delete/'+id).subscribe();
  }
  updateVet(vet:Vet){
    /*const index = this.petList.findIndex(o => o.id === pet.id);
    this.petList[index] = pet;*/
    return this.http.put('http://localhost:8090/vet/add', vet).subscribe();
  }

  addVet(vet:Vet){
    //this.petList.push(pet);
    return this.http.post('http://localhost:8090/vet/add', vet).subscribe();
  }
}
