import { Injectable } from '@angular/core';
import { Owner } from '../owner/owner';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Owner[]>{
    return this.http.get<Owner[]>('http://localhost:8090/owner/all');
  }

  findById(id:number):Observable<Owner>{
    /*const pet:Pet = this.petList.find(o => o.id === id)!;
    return pet;*/
    return this.http.get<Owner>('http://localhost:8090/owner/find/'+id);
  }

  deleteById(id:Number){
    console.log(id);
    return this.http.delete('http://localhost:8090/owner/delete/'+id).subscribe();
  }
  updateOwner(owner:Owner){
    /*const index = this.petList.findIndex(o => o.id === pet.id);
    this.petList[index] = pet;*/
    return this.http.put('http://localhost:8090/owner/add', owner).subscribe();
  }

  addOwner(owner:Owner){
    //this.petList.push(pet);
    return this.http.post('http://localhost:8090/owner/add', owner).subscribe();
  }
}
