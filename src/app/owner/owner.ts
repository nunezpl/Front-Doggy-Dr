import { Pet } from "../pet/pet";

export interface Owner{
    id:number;
    name: string ;
    username: string ;
    document: number ;
    phone?: number ;
    mail: string ;
    pets?: Pet[] ;
}