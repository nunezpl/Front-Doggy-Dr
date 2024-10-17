import { Medicine } from '../medicine/medicine'; 
import { Vet } from '../vet/vet'; 
import { Pet } from '../pet/pet';

export interface Treatment {
    id: number;
    name: string;
    medicines: Medicine[];
    description: string;
    vet: Vet;
    pets: Pet[];
}
