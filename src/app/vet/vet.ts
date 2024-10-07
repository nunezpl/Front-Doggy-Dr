import { Treatment } from '../treatment/treatment'; 

export interface Vet {
    id: number;
    name: string;
    specialty: string;
    urlImage: string;
    userName: string;
    document: number;
    phone: number;
    mail: string;
    treatments: Treatment[];
}