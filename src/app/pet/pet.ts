import { Owner } from "../owner/owner";
import { Treatment } from "../treatment/treatment";

export interface Pet{
    id:number;
    nombre: string ;
    raza: string ;
    edad: number ;
    enfermedad: string ;
    peso: number;
    urlImage: string ;
    owner: Owner;
    treatments: Treatment[];
    //appointments: Appointment[];
}