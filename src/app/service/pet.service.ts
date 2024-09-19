import { Injectable } from '@angular/core';
import { Pet } from '../pet/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor() { }

  //Base de datos falsa
  petList: Pet[] = [
    {
      id: 1,
      nombre: "Perry", 
      raza: "French Poodle", 
      edad: 2, 
      enfermedad: "Otitis", 
      peso: 3.4, 
      urlImage: "https://wowmascota.com/wp-content/uploads/2019/05/pets-753464_640.jpg"
    },
    {
      id: 2,
      nombre: "Lucas", 
      raza: "Labrador", 
      edad: 2,
      enfermedad: "Gastroenteritis",
      peso: 6.1,
      urlImage: "https://es.mypet.com/wp-content/uploads/sites/23/2021/03/ThinkstockPhotos-590080440.jpg?w=1024"
    }
  ];

  findAll(){
    return this.petList;
  }

  findById(id:number):Pet{
    const pet:Pet = this.petList.find(o => o.id === id)!;
    return pet;
  }
}
