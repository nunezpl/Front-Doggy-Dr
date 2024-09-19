import { Owner } from "../owner/owner";

export interface Pet{
    id:number;
    nombre: string ;
    raza: string ;
    edad: number ;
    enfermedad: string ;
    peso: number;
    urlImage: string ;
    //owner: Owner;
}