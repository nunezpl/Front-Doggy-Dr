import { Injectable } from '@angular/core';
import { Owner } from '../owner/owner';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../pet/pet';

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
    console.log("Fing by id:", id);
    return this.http.get<Owner>('http://localhost:8090/owner/'+id);
  }

  findByDocument(document:number):Observable<Owner>{
    console.log("Fing by document:", document);
    return this.http.get<Owner>('http://localhost:8090/owner/document/'+document);
  }

  deleteById(id:Number){
    console.log(id);
    return this.http.delete('http://localhost:8090/owner/delete/'+id).subscribe();
  }

  updateOwner(owner:Owner): Observable<Owner>{
    /*const index = this.petList.findIndex(o => o.id === pet.id);
    this.petList[index] = pet;*/
    if (!owner || !owner.id) { // Verificar que pet y su ID estén definidos
      console.error("No se puede actualizar el cliente porque no se ha proporcionado un ID válido.");
      throw new Error("El objeto `Owner` o su ID no está definido.");
    }
    console.log(" UpdateOwner: ", owner);
    
    return this.http.put<Owner>('http://localhost:8090/owner/update/'+ owner.id, owner);
  }

  addOwner(owner: Owner): Observable<Owner> {
    console.log('Cliente a agregar:', owner); 
    return this.http.post<Owner>('http://localhost:8090/owner/register', owner);
  }

  findOwnerPets(id:number):Observable<Pet[]>{
    return this.http.get<Pet[]>('http://localhost:8090/owner/'+id+ '/pets');
  }

  ownerHome():Observable<Owner>{
    return this.http.get<Owner>('http://localhost:8090/owner/details');
  }
}
