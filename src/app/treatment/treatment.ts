import { Medicine } from '../medicine/medicine'; 
import { Vet } from '../vet/vet'; 
import { Pet } from '../pet/pet';

export interface Treatment {
    id: number;
    name: string;
    medicines: Medicine[];
    description: string;
    vet: Vet;
<<<<<<< HEAD
    pets: Pet[];
=======
    pet: Pet;
>>>>>>> b6d8eb92179e9b2493b5c0ec3b584d3671de3d8e
    startDate: Date;
    endDate: Date;
}
