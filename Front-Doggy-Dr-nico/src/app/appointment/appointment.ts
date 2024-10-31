import { Pet } from '../pet/pet'; 
import { Service } from '../services/service'; 
import { Payment } from '../payment/payment';

export interface Appointment {
    id: number;
    date: Date;
    time: string; // Representa Time como string en formato 'HH:mm:ss'
    pet: Pet; // Relación con Pet
    services: Service[]; // Relación con Service
    payment?: Payment; // Relación con Payment (opcional)
}
