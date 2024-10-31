import { Appointment } from '../appointment/appointment'; 

export interface Payment {
    id: number;
    price: number;
    appointment: Appointment; // Relación con Appointment
}
